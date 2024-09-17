import { useCallback, useRef, useState } from 'react';
import ControlElement from './ControlElement';
import DotLoader from '../DotLoader';
import { useAppControl } from '../../state/AppControlContext';
import { initAppConfig } from '../../state/initState.ts';
import { measureInteraction } from '../../common/measureInteraction.ts';
import Emitter from '../../common/emitter.ts';
import { EmitterEvents } from '../../common/emitter.ts';
import { measureMemory } from '../../common/measureMemory.ts';
import { AppConfig, availableStateManagers } from 'types/global';

import './styles.css';


function parseIntOrReturnValue(x: string): number | string {
  const parsed = Number.parseInt(x);
  if (Number.isNaN(parsed)) {
    return x;
  }
  return parsed;
}

const ControlPanel = () => {
  const { setAppConfig } = useAppControl();

  const [timeMeasurementResult, setTimeMeasurementResult] = useState<number>(0);
  const [memoryMeasurementResult, setMemoryMeasurementResult] = useState<number>(0);
  const [memoryMeasurementResultAfterGC, setMemoryMeasurementResultAfterGC] = useState<number>(0);
  const [isMeasuring, setIsMeasuring] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const emitAndMeasure = useCallback((emitterEvent: EmitterEvents) => {
    setIsMeasuring(true);

    measureInteraction({
      toMeasure: () => {
        Emitter.emit(emitterEvent);
      },
      setTimeResult: setTimeMeasurementResult,
      setMemoryResult: (res1, res2) => {
        setIsMeasuring(false);
        setMemoryMeasurementResult(res1);
        setMemoryMeasurementResultAfterGC(res2);
      }
    });
  }, []);

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
              setIsMeasuring(true);

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
                setTimeResult: setTimeMeasurementResult,
                setMemoryResult: (res1, res2) => {
                  setIsMeasuring(false);
                  setMemoryMeasurementResult(res1);
                  setMemoryMeasurementResultAfterGC(res2);
                }
              });
            }
          }}>
          <ControlElement title="State Manager:">
            <select name="selectedStateManager" style={ {
              fontFamily: "inherit",
              fontSize: "inherit",
              fontWeight: "inherit",
              lineHeight: "inherit",
              color: "#0d1117",
              backgroundColor: "#fff",
              border: "0",
              borderRadius: "4px",
              padding: "4px 8px",
              cursor: "pointer",
              transition: "background-color 0.2s ease-in-out"
            }
            }>
              {availableStateManagers.map((stateManager) => (
                <option value={stateManager} key={stateManager}>
                  {stateManager}
                </option>
              ))}
            </select>
          </ControlElement>

          <ControlElement title="Grid size:">
            <input id="gridSize"
                   name="gridSize"
                   placeholder={initAppConfig.gridSize.toString()}
                   style={{ textAlign: 'right' }}
                   type="number" />
          </ControlElement>

          <ControlElement>
            <button data-testid="drawRandomPixel"
                    name="drawRandomPixel"
                    style={{ textAlign: 'right' }}
                    onClick={() => emitAndMeasure(EmitterEvents.DRAW_RANDOM_PIXEL)}
                    type="button"
            >
              Draw Random Pixel
            </button>
          </ControlElement>

          <ControlElement>
            <button data-testid="drawRandomRow"
                    name="drawRandomRow"
                    style={{ textAlign: 'right' }}
                    type="button"
                    onClick={() => emitAndMeasure(EmitterEvents.DRAW_RANDOM_ROW)}
            >
              Draw Random Row
            </button>
          </ControlElement>

          <ControlElement>
            <button data-testid="swapRows"
                    name="swapRows"
                    style={{ textAlign: 'right' }}
                    type="button"
                    onClick={() => emitAndMeasure(EmitterEvents.SWAP_ROWS)}
            >
              Swap Rows
            </button>
          </ControlElement>

          <ControlElement>
            <input type="reset"
                   value="Reset"
                   onClick={() => {
                     setAppConfig(initAppConfig);
                     setTimeMeasurementResult(0);
                     setMemoryMeasurementResult(0);
                     setMemoryMeasurementResultAfterGC(0);
                   }}
                   style={{
                     margin: '0 4px',
                     color: '#FFF',
                     width: 100,
                     backgroundColor: 'red',
                     cursor: 'pointer'
                   }} />
            <input type="submit"
                   value="Apply"
                   style={{
                     marginLeft: '4px',
                     color: '#FFF',
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
        maxWidth: '100%',
        justifyContent: 'space-between'
      }}>
        <section>
          <h1 style={{ textAlign: 'center' }}>Results</h1>

          <div>
            <p>Interaction took: {Math.round(timeMeasurementResult * 1000) / 1000} ms</p>
          </div>

          {!isMeasuring ? (
            <>
              <div>
                {memoryMeasurementResult ?
                  <p data-testid="memoryInUse">Memory in use: {memoryMeasurementResult} MB</p>
                  : null}
              </div>
              <div>
                {memoryMeasurementResultAfterGC ?
                  <p data-testid="memoryInUseAfterGC">Memory in use after GC: {memoryMeasurementResultAfterGC} MB</p>
                  : null}
              </div>
            </>
          ) : null}

        </section>

        <section style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {isMeasuring ? <DotLoader /> : null}
          <button data-testid="memorySnapshot"
                  name="memorySnapshot"
                  style={{ backgroundColor: '#006fff', color: '#FFF', margin: '8px', cursor: 'pointer' }}
                  onClick={async () => {
                    setIsMeasuring(true);

                    measureMemory().then(([res1, res2]) => {
                      setIsMeasuring(false);
                      setMemoryMeasurementResult(res1);
                      setMemoryMeasurementResultAfterGC(res2);
                    });
                  }}
                  type="button"
          >
            Memory Snapshot
          </button>
        </section>
      </div>
    </menu>
  );
};

export default ControlPanel;