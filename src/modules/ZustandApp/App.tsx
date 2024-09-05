import PixelGrid from './components/PixelGrid';
import { usePixelsStore } from './state/store';
import { useEffect } from 'react';
import Emitter, { EmitterEvents } from '../../common/emitter.ts';
import { measureInteraction } from '../../common/measureInteraction.ts';

type AppProps = {
  gridSize: number;
};

const App = ({ gridSize }: AppProps) => {
  const setupPixels = usePixelsStore((state) => state.setupPixels);
  const setPixelColor = usePixelsStore((state) => state.setPixelColor);
  const pixels = usePixelsStore((state) => state.pixels);

  useEffect(() => {
    setupPixels(gridSize);
  }, [gridSize, setupPixels]);


  useEffect(() => {
    Emitter.on(EmitterEvents.DRAW_RANDOM_PIXEL, () => {
      if (!pixels?.length) return;

      const randomX = Math.floor(Math.random() * pixels.length);
      const randomY = Math.floor(Math.random() * pixels.length);
      const randomColor = 'red';
      measureInteraction({
        toMeasure: () => {
          setPixelColor(randomX, randomY, randomColor);
        }
      });
    });

    return () => {
      Emitter.removeListener(EmitterEvents.DRAW_RANDOM_PIXEL);
    };
  }, [pixels]);

  if (!pixels?.length) return (<div>Set valid configuration</div>);
  if (pixels?.length !== gridSize) return (<div>Calculating...</div>);

  return (
    <div>
      <PixelGrid size={gridSize} />
    </div>
  );
};

export default App;