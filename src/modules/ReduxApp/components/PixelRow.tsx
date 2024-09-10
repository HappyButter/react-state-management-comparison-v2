import Pixel from './Pixel';
import { CSSProperties } from 'react';

type PixelRowProps = {
  rowIndex: number;
  size: number;
};

const styles: CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row'
};

const PixelRow = ({ rowIndex, size }: PixelRowProps) => {
  return (
    <div style={{...styles, border: rowIndex%2 === 0 ? '1px solid red' : '1px solid black'}}>
      {Array(size)
        .fill(null)
        .map((_, colIndex) => (
          <Pixel key={`Pixel_${rowIndex}_${colIndex}`}
                 rowIndex={rowIndex}
                 colIndex={colIndex}
          />
        ))}
    </div>
  );
};

export default PixelRow;