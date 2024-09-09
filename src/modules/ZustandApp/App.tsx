import PixelGrid from './components/PixelGrid';
import { usePixelsStore } from './state/store';
import { useEffect } from 'react';
import Emitter, { EmitterEvents } from '../../common/emitter.ts';

const randomColor = 'red';

type AppProps = {
  gridSize: number;
};

const App = ({ gridSize }: AppProps) => {
  const setupPixels = usePixelsStore((state) => state.setupPixels);
  const setPixelColor = usePixelsStore((state) => state.setPixelColor);
  const setPixelRowColor = usePixelsStore((state) => state.setPixelRowColor);
  const swapRows = usePixelsStore((state) => state.swapRows);
  const pixels = usePixelsStore((state) => state.pixels);

  useEffect(() => {
    setupPixels(gridSize);
  }, [gridSize, setupPixels]);


  useEffect(() => {
    Emitter.on(EmitterEvents.DRAW_RANDOM_PIXEL, () => {
      if (!pixels?.length) return;

      const randomX = Math.floor(Math.random() * pixels.length);
      const randomY = Math.floor(Math.random() * pixels.length);
      setPixelColor(randomX, randomY, randomColor);
    });

    Emitter.on(EmitterEvents.SWAP_ROWS, () => {
      if (!pixels?.length) return;

      const randomRow = Math.floor(Math.random() * (pixels.length - 1));
      swapRows(randomRow, randomRow + 1);
    });

    Emitter.on(EmitterEvents.DRAW_RANDOM_ROW, () => {
      if (!pixels?.length) return;

      const randomRow = Math.floor(Math.random() * pixels.length);

      setPixelRowColor(randomRow, randomColor);
    });

    return () => {
      Emitter.removeListener(EmitterEvents.DRAW_RANDOM_PIXEL);
      Emitter.removeListener(EmitterEvents.SWAP_ROWS);
      Emitter.removeListener(EmitterEvents.DRAW_RANDOM_ROW);
    };
  }, [pixels]);

  if (!pixels?.length) return (<div>Set valid configuration</div>);
  if (pixels?.length !== gridSize) return (<div>Calculating...</div>);

  return (
    <>
      <PixelGrid size={gridSize} />
    </>
  );
};

export default App;