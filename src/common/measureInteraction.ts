import afterFrame from 'afterframe';

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
  setResult: (result: number) => void;
}

const measureInteraction = ({
  toMeasure = () => {},
  setResult = () => {}
}: MeasurementResultProps) => {
  const interaction = measureInteractionFactory();

  toMeasure();

  afterFrame(() => {
    const res = interaction.end();
    console.log('Interaction took', res, 'ms');
    setResult(res);
  });
};

export { measureInteraction };