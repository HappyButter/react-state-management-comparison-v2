// src/modules/MobXApp/state/store.ts
import { makeAutoObservable } from 'mobx';

class PixelStore {
  pixels: { color: string }[][] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setupPixels(size: number) {
    this.pixels = Array.from({ length: size }, (_, rowIndex) =>
      Array.from({ length: size }, (_, colIndex) => ({
        color: this.getPixelColor(rowIndex, colIndex)
      }))
    );
  }

  setPixelColor(rowIndex: number, colIndex: number, color: string) {
    this.pixels[rowIndex][colIndex].color = color;
  }

  setPixelRowColor(rowIndex: number, color: string) {
    for (let i = 0; i < this.pixels[rowIndex].length; i++) {
      this.pixels[rowIndex][i].color = color;
    }
  }

  swapRows(rowIndex1: number, rowIndex2: number) {
    const temp = this.pixels[rowIndex1];
    this.pixels[rowIndex1] = this.pixels[rowIndex2];
    this.pixels[rowIndex2] = temp;
  }

  private getPixelColor(rowIndex: number, colIndex: number) {
    const isEvenRow = rowIndex % 2 === 0;
    const isEvenCol = colIndex % 2 === 0;
    return isEvenRow ? (isEvenCol ? 'blue' : 'pink') : (isEvenCol ? 'green' : 'yellow');
  }
}

const pixelStore = new PixelStore();
export default pixelStore;