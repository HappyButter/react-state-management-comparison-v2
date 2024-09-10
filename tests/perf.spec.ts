import { test } from './pages/page';
import { StateManagerType } from './types/types';
import { generateChart } from './generateChart';

const repeat = async (fn: () => Promise<void>, times: number) => {
  for (let i = 0; i < times; i++) {
    await fn();
  }
};

const repeatTimes = 10;
const availableStateManagers: StateManagerType[] = ['ContextAPI', 'Zustand'];
const gridSizes = [10, 100, 200];

type AggregatedResultsByTestType = {
  [key: string]: {
    [key: number]: {
      title: string;
      dataLabels: string[];
      chartData: number[][];
    };
  };
};

const aggregatedResultsByTestType: AggregatedResultsByTestType = {
  mount: {},
  drawRandomPixel: {},
  drawRandomRow: {},
  swapRows: {}
};
type TestType = 'mount' | 'drawRandomPixel' | 'drawRandomRow' | 'swapRows';

const appendResults = (testType: TestType, gridSize: number, title: string, dataLabel: string, chartData: number[]) => {
  if (!aggregatedResultsByTestType[testType][gridSize]) {
    aggregatedResultsByTestType[testType][gridSize] = {
      title,
      dataLabels: [],
      chartData: []
    };
  }

  aggregatedResultsByTestType[testType][gridSize].dataLabels.push(dataLabel);
  aggregatedResultsByTestType[testType][gridSize].chartData.push(chartData);
};

test.describe('Generate charts', async () => {

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
            await mainPage.waitForClearScreen();

            return Promise.resolve();
          }, repeatTimes);

          const chartData: number[][] = [mainPage.popLogResults().timeResults];
          const dataLabels: string[] = [testTitle];

          const currentChartTitle = `${stateManager} - ${testTitle}`;
          await generateChart(currentChartTitle, chartData, dataLabels);
          appendResults('mount', gridSize, testTitle, stateManager, chartData[0]);
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
            console.log("mount results", currentResults);

            await repeat(async () => {
              await mainPage.drawRandomPixelButton.click();
              await mainPage.waitForMemoryResults();

              return Promise.resolve();
            }, repeatTimes);


            const chartData: number[][] = [mainPage.popLogResults().timeResults];
            const dataLabels: string[] = [testTitle];

            const currentChartTitle = `${stateManager} - ${testTitle}`;
            await generateChart(currentChartTitle, chartData, dataLabels);
            appendResults('drawRandomPixel', gridSize, testTitle, stateManager, chartData[0]);
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
            console.log("mount results", currentResults);

            await repeat(async () => {
              await mainPage.drawRandomRowButton.click();
              await mainPage.waitForMemoryResults();

              return Promise.resolve();
            }, repeatTimes);


            const chartData: number[][] = [mainPage.popLogResults().timeResults];
            const dataLabels: string[] = [testTitle];

            const currentChartTitle = `${stateManager} - ${testTitle}`;
            await generateChart(currentChartTitle, chartData, dataLabels);
            appendResults('drawRandomRow', gridSize, testTitle, stateManager, chartData[0]);
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
            console.log("mount results", currentResults);

            await repeat(async () => {
              await mainPage.swapRowsButton.click();
              await mainPage.waitForMemoryResults();

              return Promise.resolve();
            }, repeatTimes);


            const chartData: number[][] = [mainPage.popLogResults().timeResults];
            const dataLabels: string[] = [testTitle];

            const currentChartTitle = `${stateManager} - ${testTitle}`;
            await generateChart(currentChartTitle, chartData, dataLabels);
            appendResults('swapRows', gridSize, testTitle, stateManager, chartData[0]);
          });
        }
    });
  }

  test.afterAll(async () => {
    console.log('All tests finished. Generating aggregated charts...');

    for (const testType in aggregatedResultsByTestType) {
      for (const gridSize in aggregatedResultsByTestType[testType]) {
        const { title, dataLabels, chartData } = aggregatedResultsByTestType[testType][gridSize];
        await generateChart(title, chartData, dataLabels);
      }
    }
  });
});