import { useEffect } from 'react';
import { usePixelsContext } from './state/store';
import PixelGrid from './components/PixelGrid';

type AppProps = {
  gridSize: number;
};

const App = ({ gridSize }: AppProps) => {
  const { pixels, setupPixels } = usePixelsContext();

  useEffect(() => {
    setupPixels(gridSize);
  }, [gridSize, setupPixels]);

  if (pixels?.length !== gridSize) return (<div>Calculating...</div>);

  return (
    <div>
      <PixelGrid size={gridSize} />
    </div>
  );
};

export default App;