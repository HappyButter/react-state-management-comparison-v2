import { observer } from 'mobx-react-lite';
import pixelStore from '../state/store';

type PixelProps = {
  rowIndex: number;
  colIndex: number;
};

const Pixel = observer(({ rowIndex, colIndex }: PixelProps) => {
  const pixel = pixelStore.pixels[rowIndex][colIndex];

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: pixel.color
      }}
    />
  );
});

export default Pixel;