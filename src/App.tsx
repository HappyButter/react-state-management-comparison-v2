import { lazy, Suspense } from 'react';
import { useAppControl } from './state/AppControlContext';
import { AvailableStateManagerType } from './types/global';
import ControlPanel from './components/ControlPanel';

// import ContextApp from 'modules/ContextApp';
const ContextApp = lazy(() => import('modules/ContextApp'));
const ZustandApp = lazy(() => import('modules/ZustandApp'));

const renderSelectedExample = (option: AvailableStateManagerType, gridSize: number) => {
  switch (option) {
    case 'ContextAPI':
      return <ContextApp gridSize={gridSize}/>;
    case 'Zustand':
      return <ZustandApp gridSize={gridSize}/>;
    case 'Redux':
    case 'None':
    default:
      return <h1>None</h1>;
  }
};


function App() {
  const { selectedStateManager, gridSize } = useAppControl();

  return (
    <div style={{
      width: '100vw',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <ControlPanel />

      <Suspense fallback={<div>Loading...</div>}>
        {renderSelectedExample(selectedStateManager, gridSize)}
      </Suspense>
    </div>
  );
}

export default App;
