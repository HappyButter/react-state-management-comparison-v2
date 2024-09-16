import { useEffect } from 'react';
import PixelGrid from './components/PixelGrid';
import { usePixelsDispatch, usePixelsSelector } from './state/hooks';
import { RootState } from './state/store.ts';
import { setPixelColor, setPixelRowColor, setupPixels, swapRows } from './state/slice';
import Emitter, { EmitterEvents } from '../../common/emitter.ts';

const randomColor = 'red';

type AppProps = {
  gridSize: number;
};

const App = ({ gridSize }: AppProps) => {
  const pixels = usePixelsSelector((state: RootState) => state.pixels.values);
  const dispatch = usePixelsDispatch();

  useEffect(() => {
    dispatch(setupPixels(gridSize));
  }, [gridSize]);

  useEffect(() => {
    Emitter.on(EmitterEvents.DRAW_RANDOM_PIXEL, () => {
      if (!pixels?.length) return;

      const randomX = Math.floor(Math.random() * pixels.length);
      const randomY = Math.floor(Math.random() * pixels.length);
      dispatch(setPixelColor({ x: randomX, y: randomY, color: randomColor }));
    });

    Emitter.on(EmitterEvents.SWAP_ROWS, () => {
      if (!pixels?.length) return;

      const randomRow = Math.floor(Math.random() * (pixels.length - 1));
      dispatch(swapRows({ row1: randomRow, row2: randomRow + 1 }));
    });

    Emitter.on(EmitterEvents.DRAW_RANDOM_ROW, () => {
      if (!pixels?.length) return;

      const randomRow = Math.floor(Math.random() * pixels.length);

      dispatch(setPixelRowColor({ rowIndex: randomRow, color: randomColor }));
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