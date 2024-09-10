import AppContext from './App';
import { Provider } from 'react-redux';
import { pixelsStore } from './state/store.ts';

type AppProps = {
  gridSize: number;
};

const App = (props: AppProps) => {
  return (
    <Provider store={pixelsStore}>
      <AppContext {...props} />
    </Provider>
  );
};

export default App;