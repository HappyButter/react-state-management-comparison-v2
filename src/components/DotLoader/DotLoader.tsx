import { CSSProperties, useEffect } from 'react';

interface DotLoaderProps {
  color?: string;
}

const DotLoader: React.FC<DotLoaderProps> = ({ color = '#1c4c5b' }) => { // Define the styles as a JavaScript object
  const loaderStyle: CSSProperties = {
    position: 'relative',
    width: '80px',
    height: '10px',
    marginBottom: '40px',
    color: color // Color passed as a prop
  };

  const dotStyle: CSSProperties = {
    position: 'absolute',
    top: '33.33333px',
    width: '13.33333px',
    height: '13.33333px',
    borderRadius: '50%',
    background: 'currentColor',
    animationTimingFunction: 'cubic-bezier(0, 1, 1, 0)'
  };

  useEffect(() => {
    // Insert keyframes individually
    const styleSheet = document.styleSheets[0];

    if (styleSheet) {
      styleSheet.insertRule(`
        @keyframes lds-ellipsis1 {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }
      `, styleSheet.cssRules.length);

      styleSheet.insertRule(`
        @keyframes lds-ellipsis2 {
          0% { transform: translate(0, 0); }
          100% { transform: translate(24px, 0); }
        }
      `, styleSheet.cssRules.length);

      styleSheet.insertRule(`
        @keyframes lds-ellipsis3 {
          0% { transform: scale(1); }
          100% { transform: scale(0); }
        }
      `, styleSheet.cssRules.length);
    }
  }, []);

  return (
    <div style={loaderStyle}>
      <div
        style={{
          ...dotStyle,
          left: '8px',
          animation: 'lds-ellipsis1 0.6s infinite'
        }}
      ></div>
      <div
        style={{
          ...dotStyle,
          left: '8px',
          animation: 'lds-ellipsis2 0.6s infinite'
        }}
      ></div>
      <div
        style={{
          ...dotStyle,
          left: '32px',
          animation: 'lds-ellipsis2 0.6s infinite'
        }}
      ></div>
      <div
        style={{
          ...dotStyle,
          left: '56px',
          animation: 'lds-ellipsis3 0.6s infinite'
        }}
      ></div>
    </div>
  );
};

export default DotLoader;