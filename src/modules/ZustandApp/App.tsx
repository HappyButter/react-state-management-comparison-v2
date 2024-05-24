import PixelGrid from './components/PixelGrid';
import { usePixelsStore } from './state/store';
import { useEffect } from 'react';

type AppProps = {
  gridSize: number;
};

const App = ({gridSize}: AppProps) => {
  const setupPixels = usePixelsStore((state) => state.setupPixels);
  const pixels = usePixelsStore((state) => state.pixels);

  useEffect(() => {
    setupPixels(gridSize);
  }, [gridSize, setupPixels]);

  if(pixels?.length !== gridSize) return (<div>Calculating...</div>);

  return (
    <div>
      <PixelGrid size={gridSize} />
    </div>
  )
}

export default App;