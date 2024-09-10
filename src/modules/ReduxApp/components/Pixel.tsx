import { usePixelsSelector } from '../state/hooks';
import { RootState } from '../state/store';

type PixelProps = {
  rowIndex: number;
  colIndex: number;
};

const Pixel = ({ rowIndex, colIndex }: PixelProps) => {
  const pixel = usePixelsSelector((state: RootState) => state.pixels.values[rowIndex][colIndex]);

  return <div style={{
    height: '100%',
    width: '100%',
    backgroundColor: pixel.color
  }} />;
};

export default Pixel;