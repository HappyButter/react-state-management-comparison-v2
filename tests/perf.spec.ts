import { test } from './pages/page';
import { StateManagerType } from './types/types';
import { generateChart } from './generateChart';
import { saveToJson2 } from './saveToJson';

const repeat = async (fn: () => Promise<void>, times: number) => {
  for (let i = 0; i < times; i++) {
    await fn();
  }
};

const repeatTimes = 30;
const availableStateManagers: StateManagerType[] = ['ContextAPI', 'Zustand', 'Redux', 'MobX'];
// const availableStateManagers: StateManagerType[] = ['MobX'];
const gridSizes = [10, 100, 200, 300];



test.describe('Save results to JSON', async () => {

  for (const stateManager of availableStateManagers) {
    test.describe(`Performance tests for ${stateManager}`, () => {

      test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/');
      });

      for (const gridSize of gridSizes) {
        const testTitle = `Mount - grid ${gridSize}x${gridSize}`;

        test(testTitle, async ({ mainPage }) => {
          await repeat(async () => {
            await mainPage.fillConfigurations(stateManager, gridSize);
            await mainPage.applyButton.click();
            await mainPage.waitForPixels();
            await mainPage.waitForMemoryResults();
            await mainPage.resetButton.click();
            // await mainPage.reload();
            await mainPage.waitForClearScreen();

            return Promise.resolve();
          }, repeatTimes);

          const chartData = mainPage.popLogResults()
          const chartTimeData: number[][] = [chartData.timeResults];
          const chartMemData: number[][] = [chartData.memResults];
          const chartMemAfterGCData: number[][] = [chartData.memAfterGCResults];
          // const dataLabels: string[] = [testTitle];

          // const currentChartTitle = `${stateManager} - ${testTitle}`;
          // await generateChart(currentChartTitle, chartTimeData, dataLabels);

          saveToJson2(`./results-time/mount/${gridSize}/${stateManager}.json`, {
            testTitle,
            chartData: chartTimeData[0],
            dataLabel: stateManager
          });

          saveToJson2(`./results-memory/mount/${gridSize}/${stateManager}.json`, {
            testTitle,
            chartData: chartMemData[0],
            dataLabel: stateManager
          });

          saveToJson2(`./results-memory-after-gc/mount/${gridSize}/${stateManager}.json`, {
            testTitle,
            chartData: chartMemAfterGCData[0],
            dataLabel: stateManager
          });
        });
      }

      for (const gridSize of gridSizes) {
        const testTitle = `Draw random pixel - grid ${gridSize}x${gridSize}`;

        test(testTitle, async ({ mainPage }) => {
          await mainPage.fillConfigurations(stateManager, gridSize);
          await mainPage.applyButton.click();
          await mainPage.waitForPixels();
          await mainPage.waitForMemoryResults();

          const currentResults = mainPage.popLogResults();
          console.log('mount results', currentResults);

          await repeat(async () => {
            await mainPage.drawRandomPixelButton.click();
            await mainPage.waitForMemoryResults();

            return Promise.resolve();
          }, repeatTimes);


          const chartData = mainPage.popLogResults()
          const chartTimeData: number[][] = [chartData.timeResults];
          const chartMemData: number[][] = [chartData.memResults];
          const chartMemAfterGCData: number[][] = [chartData.memAfterGCResults];
          const dataLabels: string[] = [testTitle];

          const currentChartTitle = `${stateManager} - ${testTitle}`;
          await generateChart(currentChartTitle, chartTimeData, dataLabels);

          saveToJson2(`./results-time/drawRandomPixel/${gridSize}/${stateManager}.json`, {
            testTitle,
            chartData: chartTimeData[0],
            dataLabel: stateManager
          });

          saveToJson2(`./results-memory/drawRandomPixel/${gridSize}/${stateManager}.json`, {
            testTitle,
            chartData: chartMemData[0],
            dataLabel: stateManager
          });

          saveToJson2(`./results-memory-after-gc/drawRandomPixel/${gridSize}/${stateManager}.json`, {
            testTitle,
            chartData: chartMemAfterGCData[0],
            dataLabel: stateManager
          });
        });
      }

      for (const gridSize of gridSizes) {
        const testTitle = `Draw random row - grid ${gridSize}x${gridSize}`;

        test(testTitle, async ({ mainPage }) => {
          await mainPage.fillConfigurations(stateManager, gridSize);
          await mainPage.applyButton.click();
          await mainPage.waitForPixels();
          await mainPage.waitForMemoryResults();

          const currentResults = mainPage.popLogResults();
          console.log('mount results', currentResults);

          await repeat(async () => {
            await mainPage.drawRandomRowButton.click();
            await mainPage.waitForMemoryResults();

            return Promise.resolve();
          }, repeatTimes);


          const chartData = mainPage.popLogResults()
          const chartTimeData: number[][] = [chartData.timeResults];
          const chartMemData: number[][] = [chartData.memResults];
          const chartMemAfterGCData: number[][] = [chartData.memAfterGCResults];
          const dataLabels: string[] = [testTitle];

          const currentChartTitle = `${stateManager} - ${testTitle}`;
          await generateChart(currentChartTitle, chartTimeData, dataLabels);

          saveToJson2(`./results-time/drawRandomRow/${gridSize}/${stateManager}.json`, {
            testTitle,
            chartData: chartTimeData[0],
            dataLabel: stateManager
          });

          saveToJson2(`./results-memory/drawRandomRow/${gridSize}/${stateManager}.json`, {
            testTitle,
            chartData: chartMemData[0],
            dataLabel: stateManager
          });

          saveToJson2(`./results-memory-after-gc/drawRandomRow/${gridSize}/${stateManager}.json`, {
            testTitle,
            chartData: chartMemAfterGCData[0],
            dataLabel: stateManager
          });
        });
      }

      for (const gridSize of gridSizes) {
        const testTitle = `Swap rows - grid ${gridSize}x${gridSize}`;

        test(testTitle, async ({ mainPage }) => {
          await mainPage.fillConfigurations(stateManager, gridSize);
          await mainPage.applyButton.click();
          await mainPage.waitForPixels();
          await mainPage.waitForMemoryResults();

          const currentResults = mainPage.popLogResults();
          console.log('mount results', currentResults);

          await repeat(async () => {
            await mainPage.swapRowsButton.click();
            await mainPage.waitForMemoryResults();

            return Promise.resolve();
          }, repeatTimes);


          const chartData = mainPage.popLogResults()
          const chartTimeData: number[][] = [chartData.timeResults];
          const chartMemData: number[][] = [chartData.memResults];
          const chartMemAfterGCData: number[][] = [chartData.memAfterGCResults];
          const dataLabels: string[] = [testTitle];

          const currentChartTitle = `${stateManager} - ${testTitle}`;
          await generateChart(currentChartTitle, chartTimeData, dataLabels);

          saveToJson2(`./results-time/swapRows/${gridSize}/${stateManager}.json`, {
            testTitle,
            chartData: chartTimeData[0],
            dataLabel: stateManager
          });

          saveToJson2(`./results-memory/swapRows/${gridSize}/${stateManager}.json`, {
            testTitle,
            chartData: chartMemData[0],
            dataLabel: stateManager
          });

          saveToJson2(`./results-memory-after-gc/swapRows/${gridSize}/${stateManager}.json`, {
            testTitle,
            chartData: chartMemAfterGCData[0],
            dataLabel: stateManager
          });
        });
      }
    });
  }
});