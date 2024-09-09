import { Page } from '@playwright/test';
import { StateManagerType } from '../types/types';

const floatRegexp = /\d+(\.\d+)?/g;

export const MainPage = (page: Page) => {
  const timeResultsArray: number[] = [];
  const memResultsArray: number[] = [];
  const memAfterGCResultsArray: number[] = [];

  page.on('console', (msg) => {
    if (msg.text().startsWith('Interaction took:')) {
      const res = msg.text().match(floatRegexp)?.[0];
      if (res) timeResultsArray.push(parseFloat(res));
      return;
    }

    if (msg.text().startsWith('Memory in use:')) {
      const res = msg.text().match(floatRegexp)?.[0];
      if (res) memResultsArray.push(parseFloat(res));
      return;
    }

    if (msg.text().startsWith('Memory in use after GC:')) {
      const res = msg.text().match(floatRegexp)?.[0];
      if (res) memAfterGCResultsArray.push(parseFloat(res));
      return;
    }

    console.log(msg.text());
  });

  const applyButton = page.getByText('Apply');
  const resetButton = page.getByRole('button', { name: 'Reset' });
  const drawRandomPixelButton = page.getByRole('button', { name: 'Draw Random Pixel' });
  const drawRandomRowButton = page.getByRole('button', { name: 'Draw Random Row' });
  const swapRowsButton = page.getByRole('button', { name: 'Swap Rows' });

  const fillConfigurations = async (stateManager: StateManagerType, gridSize: number) => {
    await page.selectOption('select[name="selectedStateManager"]', stateManager);
    await page.fill('input[name="gridSize"]', gridSize.toString());
  };

  const waitForPixels = async () => {
    await page.waitForSelector('div[data-testid="pixel-grid"]');
  };

  const waitForMemoryResults = async () => {
    await page.waitForSelector('p[data-testid="memoryInUse"]');
  };

  const waitForClearScreen = async () => {
    await page.waitForSelector('h1[data-testid="clear-screen"]');
  };

  const getConsoleLogResults = async () => {
    console.log("timeResultsArray: ", timeResultsArray);
    console.log("memResultsArray: ", memResultsArray);
    console.log("memAfterGCResultsArray: ", memAfterGCResultsArray);
  };

  const popLogResults = () => {
    const timeResults = timeResultsArray.splice(0, timeResultsArray.length);
    const memResults = memResultsArray.splice(0, memResultsArray.length);
    const memAfterGCResults = memAfterGCResultsArray.splice(0, memAfterGCResultsArray.length);

    return {
      timeResults,
      memResults,
      memAfterGCResults
    };
  }

  return {
    page,
    applyButton,
    resetButton,
    drawRandomPixelButton,
    drawRandomRowButton,
    swapRowsButton,
    fillConfigurations,
    waitForPixels,
    waitForMemoryResults,
    waitForClearScreen,
    getConsoleLogResults,
    popLogResults
  };
};