import AppContext from './App';
import { PixelProvider } from './state/store';

type AppProps = {
  gridSize: number;
};

const App = (props: AppProps) => {
  return (
    <PixelProvider>
      <AppContext {...props} />
    </PixelProvider>
  );
};

export default App;