import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Pixel = {
  color: string
}

type ReduxState = {
  values: Pixel[][];
}

const initialState: ReduxState = {
  values: [],
}

const getPixelColor = (rowIndex: number, colIndex: number) => {
  const isEvenRow = rowIndex % 2 === 0;
  const isEvenCol = colIndex % 2 === 0;
  return isEvenRow ?
    isEvenCol ? 'blue' : 'pink' :
    isEvenCol ? 'green' : 'yellow';
};

export const pixelsSlice = createSlice({
  name: 'pixelsSlice',
  initialState: initialState,
  reducers: {
    setupPixels: (state, action: PayloadAction<number>) => {
      state.values = Array.from({ length: action.payload }, (_, rowIndex) =>
        Array.from({ length: action.payload }, (_, colIndex) => ({
          color: getPixelColor(rowIndex, colIndex)
        }))
      )
    },
    setPixelColor: (state, action: PayloadAction<{ x: number, y: number, color: string }>) => {
      const { x, y, color } = action.payload;
      state.values[x][y] = { color };
    },
    setPixelRowColor: (state, action: PayloadAction<{ rowIndex: number, color: string }>) => {
      const { rowIndex, color } = action.payload;
      for (let i = 0; i < state.values[rowIndex].length; i++) {
        state.values[rowIndex][i] = { color };
      }
    },
    swapRows: (state, action: PayloadAction<{ row1: number, row2: number }>) => {
      const { row1, row2 } = action.payload;
      const temp = state.values[row1];
      state.values[row1] = state.values[row2];
      state.values[row2] = temp;
    },
  },
})

export const { setupPixels, setPixelColor, setPixelRowColor, swapRows } = pixelsSlice.actions;
