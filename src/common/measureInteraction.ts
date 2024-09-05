import afterFrame from 'afterframe';
import { measureMemory } from './measureMemory.ts';

const measureInteractionFactory = () => {
  // performance.now() returns the number of ms
  // elapsed since the page was opened
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
    const timeRes = interaction.end();
    console.log('Interaction took: ', timeRes, 'ms');
    setTimeResult(timeRes);

    const [res1, res2] = await measureMemory();
    setMemoryResult(res1, res2);
  });
};

export { measureInteraction };