import { useEffect } from 'react';
import { usePixelsContext } from './state/store';
import PixelGrid from './components/PixelGrid';
import Emitter, { EmitterEvents } from '../../common/emitter.ts';

const randomColor = 'red';

type AppProps = {
  gridSize: number;
};

const App = ({ gridSize }: AppProps) => {
  const { pixels, setupPixels, setPixelColor, swapRows, setPixelRowColor } = usePixelsContext();

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
      <PixelGrid size={pixels.length} />
    </>
  );
};

export default App;