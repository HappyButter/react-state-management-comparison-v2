import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

type Pixel = {
  color: string;
}

type ContextState = {
  pixels: Pixel[][];
}

type ContextActions = {
  setupPixels: (size: number) => void
  setPixelColor: (x: number, y: number, color: string) => void
  setPixelRowColor: (row: number, color: string) => void
  swapRows: (row1: number, row2: number) => void
}

const getPixelColor = (rowIndex: number, colIndex: number) => {
  const isEvenRow = rowIndex % 2 === 0;
  const isEvenCol = colIndex % 2 === 0;
  return isEvenRow ?
    isEvenCol ? 'blue' : 'pink' :
    isEvenCol ? 'green' : 'yellow';

};

const initialState: ContextState = {
  pixels: []
};

const initialActions: ContextActions = {
  setupPixels: () => {
  },
  setPixelColor: () => {
  },
  swapRows: () => {
  },
  setPixelRowColor: () => {
  }
};

const PixelContext = createContext<ContextState & ContextActions>({ ...initialState, ...initialActions });

const usePixelsContext = () => useContext(PixelContext);

const PixelProvider = ({ children }: { children: ReactNode }) => {
  const [pixels, setPixels] = useState<ContextState['pixels']>(initialState.pixels);

  const setupPixels = useCallback((size: number) => {
    setPixels(
      Array.from({ length: size }, (_, rowIndex) =>
        Array.from({ length: size }, (_, colIndex) => ({
          color: getPixelColor(rowIndex, colIndex)
        })))
    );
  }, [setPixels]);

  const setPixelColor = (rowIndex: number, colIndex: number, color: string) => {
    setPixels((state) => {
      if (state?.length === 0) return state;

      const newState = state.slice();
      const pixel = newState[rowIndex][colIndex];
      pixel.color = color;

      return newState;
    });
  };

  const swapRows = (row1: number, row2: number) => {
    setPixels((state) => {
      if (state?.length === 0) return state;
      if (row1 < 0 || row1 >= state.length || row2 < 0 || row2 >= state.length) return state;

      const newState = state.slice();

      const temp = newState[row1];
      newState[row1] = newState[row2];
      newState[row2] = temp;

      return newState;
    });
  };

  const setPixelRowColor = (rowIndex: number, color: string) => {
    setPixels((state) => {
      if (state?.length === 0) return state;

      const newState = state.slice();
      const row = newState[rowIndex];

      for(let i = 0; i < row.length; i++) {
        row[i].color = color;
      }

      return newState;
    });
  };

  const state = {
    pixels,
    setupPixels,
    setPixelColor,
    swapRows,
    setPixelRowColor
  };

  return (
    <PixelContext.Provider value={state}>
      {children}
    </PixelContext.Provider>
  );
};

export { PixelProvider, usePixelsContext };


