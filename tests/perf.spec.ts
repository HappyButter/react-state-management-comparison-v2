import { test } from './pages/page';
import { StateManagerType } from './types/types';

const repeat = async (fn: () => Promise<void>, times: number) => {
  for (let i = 0; i < times; i++) {
    await fn();
  }
};

const repeatTimes = 3;
const availableStateManagers: StateManagerType[] = ['ContextAPI', 'Zustand'];

for (const stateManager of availableStateManagers) {
  test.describe(`Performance tests for ${stateManager}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3000/');
    });

    for (const gridSize of [10, 100, 200]) {
      test(`Mount time - grid ${gridSize}x${gridSize}`, async ({ mainPage }) => {
        await repeat(async () => {
          await mainPage.fillConfigurations(stateManager, gridSize);
          await mainPage.applyButton.click();
          await mainPage.waitForPixels();
          await mainPage.waitForMemoryResults();
          await mainPage.resetButton.click();
          await mainPage.waitForClearScreen();

          return Promise.resolve();
        }, repeatTimes);

        await mainPage.getConsoleLogResults();
      });
    }

    for (const gridSize of [10, 100, 200]) {
      test(`Draw random pixel - grid ${gridSize}x${gridSize}`, async ({ mainPage }) => {
        await mainPage.fillConfigurations(stateManager, gridSize);
        await mainPage.applyButton.click();
        await mainPage.waitForPixels();
        await mainPage.waitForMemoryResults();

        const currentResults = mainPage.popLogResults();
        console.log("mount results", currentResults);

        await repeat(async () => {
          await mainPage.drawRandomPixelButton.click();
          await mainPage.waitForMemoryResults();

          return Promise.resolve();
        }, repeatTimes);

        await mainPage.getConsoleLogResults();
      });
    }

    for (const gridSize of [10, 100, 200]) {
      test(`Draw random row - grid ${gridSize}x${gridSize}`, async ({ mainPage }) => {
        await mainPage.fillConfigurations(stateManager, gridSize);
        await mainPage.applyButton.click();
        await mainPage.waitForPixels();
        await mainPage.waitForMemoryResults();

        const currentResults = mainPage.popLogResults();
        console.log("mount results", currentResults);

        await repeat(async () => {
          await mainPage.drawRandomRowButton.click();
          await mainPage.waitForMemoryResults();

          return Promise.resolve();
        }, repeatTimes);

        await mainPage.getConsoleLogResults();
      });
    }

    for (const gridSize of [10, 100, 200]) {
      test(`Swap rows - grid ${gridSize}x${gridSize}`, async ({ mainPage }) => {
        await mainPage.fillConfigurations(stateManager, gridSize);
        await mainPage.applyButton.click();
        await mainPage.waitForPixels();
        await mainPage.waitForMemoryResults();

        const currentResults = mainPage.popLogResults();
        console.log("mount results", currentResults);

        await repeat(async () => {
          await mainPage.swapRowsButton.click();
          await mainPage.waitForMemoryResults();

          return Promise.resolve();
        }, repeatTimes);

        await mainPage.getConsoleLogResults();
      });
    }
  });
}
