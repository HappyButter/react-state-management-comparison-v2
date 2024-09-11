import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import PixelGrid from './components/PixelGrid';
import pixelStore from './state/store';
import Emitter, { EmitterEvents } from '../../common/emitter.ts';

const randomColor = 'red';

type AppProps = {
  gridSize: number;
};

const App = observer(({ gridSize }: AppProps) => {
  useEffect(() => {
    pixelStore.setupPixels(gridSize);
  }, [gridSize]);

  useEffect(() => {
    Emitter.on(EmitterEvents.DRAW_RANDOM_PIXEL, () => {
      if (!pixelStore.pixels.length) return;

      const randomX = Math.floor(Math.random() * pixelStore.pixels.length);
      const randomY = Math.floor(Math.random() * pixelStore.pixels.length);
      pixelStore.setPixelColor(randomX, randomY, randomColor);
    });

    Emitter.on(EmitterEvents.SWAP_ROWS, () => {
      if (!pixelStore.pixels.length) return;

      const randomRow = Math.floor(Math.random() * (pixelStore.pixels.length - 1));
      pixelStore.swapRows(randomRow, randomRow + 1);
    });

    Emitter.on(EmitterEvents.DRAW_RANDOM_ROW, () => {
      if (!pixelStore.pixels.length) return;

      const randomRow = Math.floor(Math.random() * pixelStore.pixels.length);
      pixelStore.setPixelRowColor(randomRow, randomColor);
    });

    return () => {
      Emitter.removeListener(EmitterEvents.DRAW_RANDOM_PIXEL);
      Emitter.removeListener(EmitterEvents.SWAP_ROWS);
      Emitter.removeListener(EmitterEvents.DRAW_RANDOM_ROW);
    };
  }, []);

  if (!pixelStore.pixels.length) return (<div>Set valid configuration</div>);
  if (pixelStore.pixels.length !== gridSize) return (<div>Calculating...</div>);

  return (
    <>
      <PixelGrid size={gridSize} />
    </>
  );
});

export default App;