import afterFrame from 'afterframe';
import { measureMemory } from './measureMemory.ts';

// end() returns the number of ms
// elapsed since the page was opened
const measureInteractionFactory = () => {
  const startTimestamp = performance.now();

  return {
    end(): number {
      const endTimestamp = performance.now();
      return endTimestamp - startTimestamp;
    }
  };
};

type MeasurementResultProps = {
  toMeasure: () => void;
  setTimeResult?: (result: number) => void;
  setMemoryResult?: (result1: number, result2: number) => void;
}

const measureInteraction = ({
  toMeasure = () => {},
  setTimeResult = () => {},
  setMemoryResult = () => {},
}: MeasurementResultProps) => {
  const interaction = measureInteractionFactory();

  toMeasure();

  afterFrame(async () => {
    const timeResult = interaction.end();
    console.log('Interaction took: ', timeResult, 'ms');
    setTimeResult(timeResult);

    const [memoryInUse, memoryInUseAfterGC] = await measureMemory();
    setMemoryResult(memoryInUse, memoryInUseAfterGC);
  });
};

export { measureInteraction };