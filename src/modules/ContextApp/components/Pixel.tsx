import { usePixelsContext } from '../state/store';

type PixelProps = {
  rowIndex: number;
  colIndex: number;
};

const Pixel = ({ rowIndex, colIndex }: PixelProps) => {
  const { pixels } = usePixelsContext();

  return <div style={{
    height: '100%',
    width: '100%',
    backgroundColor: pixels[rowIndex][colIndex].color
  }} />;
};

export default Pixel;