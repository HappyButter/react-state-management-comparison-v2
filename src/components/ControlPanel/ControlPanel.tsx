import afterFrame from 'afterframe';
import { availableStateManagers } from 'types/global';
import { useAppControl } from '../../state/AppControlContext';
import ControlElement from './ControlElement';

import './styles.css';

const measureInteraction = () => {
  // performance.now() returns the number of ms
  // elapsed since the page was opened
  const startTimestamp = performance.now();

  return {
    end() {
      const endTimestamp = performance.now();
      console.log('Afterframe the interaction took', endTimestamp - startTimestamp, 'ms');
    },
  };
}


const ControlPanel = () => {
  const { selectedStateManager, setSelectedStateManager, gridSize, setGridSize } = useAppControl();
  return (
    <menu id='control-panel-wrapper'>

      <h1>Control Panel</h1>

      <div id='control-panel-content'>
        <ControlElement title='State Manager:'>
          {availableStateManagers.map((stateManager) => (
            <button
              key={stateManager}
              onClick={() => {
                const interaction = measureInteraction();

                setSelectedStateManager(stateManager);

                afterFrame(() => {
                  interaction.end();
                });
              }}
              style={{
                margin: '4px',
                width: 100,
                ...(selectedStateManager === stateManager ? { backgroundColor: 'green' } : {})
              }}
            >
              {stateManager}
            </button>
          ))}
        </ControlElement>
        <ControlElement title='Grid size:'>
          <button onClick={() => setGridSize(p => p + 1)}>+</button>
          <input id='control-panel-input'
                 type='number'
                 value={gridSize}
                 onChange={(e) => setGridSize(Number(e.target.value))} />
          <button onClick={() => setGridSize(p => p - 1 > 0 ? p - 1 : p)}>-</button>
        </ControlElement>

        <ControlElement title={"Control"}>
          <button onClick={() => setGridSize(p => p - 1 > 0 ? p - 1 : p)}
                  style={{
                    margin: '4px',
                    width: 100,
                    backgroundColor: 'green'
                  }}>
            Apply
          </button>
        </ControlElement>
      </div>

    </menu>
  );
};

export default ControlPanel;