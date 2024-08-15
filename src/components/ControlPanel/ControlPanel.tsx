import { useRef, useState } from 'react';
import { AppConfig, availableStateManagers } from 'types/global';
import { useAppControl } from '../../state/AppControlContext';
import ControlElement from './ControlElement';
import { measureInteraction } from '../../common/measureInteraction.ts';

import './styles.css';
import { initAppConfig } from '../../state/initState.ts';
import Emitter from '../../common/emitter.ts';
import { EmitterEvents } from '../../common/emitter.ts';


function parseIntOrReturnValue(x: string): number | string {
  const parsed = Number.parseInt(x);
  if (Number.isNaN(parsed)) {
    return x;
  }
  return parsed;
}

const ControlPanel = () => {
  const { setAppConfig } = useAppControl();

  const [measurementResult, setMeasurementResult] = useState<number>(0);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <menu id="control-panel-wrapper">

      <div style={{ flexBasis: '75%', paddingRight: '10px', height: '100%' }}>
        <h1 style={{ textAlign: 'center' }}>Control Panel</h1>

        <form
          id="control-panel"
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();

            if (formRef && formRef.current) {
              measureInteraction({
                toMeasure: () => {
                  const entries = new FormData(formRef.current ?? undefined).entries();
                  const formDataParsed = (Object.fromEntries(entries) as never) as AppConfig;

                  const result: AppConfig = { ...initAppConfig };
                  for (const entry of Object.entries(formDataParsed)) {
                    const [key, value] = entry as [string, string];
                    // @ts-ignore
                    result[key as keyof AppConfig] = parseIntOrReturnValue(value);
                  }

                  setAppConfig(result);
                },
                setResult: setMeasurementResult
              });
            }
          }}>
          <ControlElement title="State Manager:">
            <select name="selectedStateManager">
              {availableStateManagers.map((stateManager) => (
                <option value={stateManager} key={stateManager}>
                  {stateManager}
                </option>
              ))}
            </select>
          </ControlElement>

          <ControlElement>
            <button data-testid="drawRandomPixel"
                    name="drawRandomPixel"
                    style={{ textAlign: 'right' }}
                    onClick={() => {
                      Emitter.emit(EmitterEvents.DRAW_RANDOM_PIXEL);

                      // measureInteraction({
                      //   toMeasure: () => {
                      //     Emitter.emit(EmitterEvents.DRAW_RANDOM_PIXEL);
                      //   },
                      //   setResult: setMeasurementResult
                      // });
                    }}
                    type="button"
            >
              Draw Random Pixel
            </button>
          </ControlElement>

          <ControlElement title="Grid size:">
            <input id="gridSize"
                   name="gridSize"
                   placeholder={initAppConfig.gridSize.toString()}
                   style={{ textAlign: 'right' }}
                   type="number" />
          </ControlElement>

          <ControlElement>
            <input type="reset"
                   value="Reset"
                   onClick={() => {
                     setAppConfig(initAppConfig);
                   }}
                   style={{
                     margin: '4px',
                     width: 100,
                     backgroundColor: 'red',
                     cursor: 'pointer'
                   }} />
            <input type="submit"
                   value="Apply"
                   style={{
                     margin: '4px',
                     width: 100,
                     backgroundColor: 'green',
                     cursor: 'pointer'
                   }} />
          </ControlElement>
        </form>
      </div>

      <div style={{ width: '1px', backgroundColor: 'grey', height: '100%', display: 'flex' }} />

      <div style={{
        flexBasis: '25%',
        paddingLeft: '10px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxWidth: '100%'
      }}>
        <h1 style={{ textAlign: 'center' }}>Results</h1>

        <div>
          <p>Interaction took: {Math.round(measurementResult * 1000) / 1000} ms</p>
        </div>

      </div>
    </menu>
  );
};

export default ControlPanel;