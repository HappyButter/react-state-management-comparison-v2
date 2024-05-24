import { usePixelsStore } from '../state/store';

type PixelProps = {
  rowIndex: number;
  colIndex: number;
};

const Pixel = ({ rowIndex, colIndex }: PixelProps) => {
  const pixel = usePixelsStore((state) => state.pixels[rowIndex][colIndex]);

  return <div style={{
    height: '100%',
    width: '100%',
    backgroundColor: pixel.color
  }} />;
};

export default Pixel;