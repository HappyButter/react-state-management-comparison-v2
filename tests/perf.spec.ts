import { test, expect } from './pages/page';

const repeat = async (fn: () => Promise<void>, times: number) => {
  for (let i = 0; i < times; i++) {
    await fn();
  }
};

test.describe('Performance tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('ContextAPI', async ({ mainPage }) => {
    await expect(mainPage.page).toHaveTitle(/ManageState/);

    await repeat(async () => {
      await mainPage.fillConfigurations('ContextAPI', 100);
      await mainPage.applyButton.click();
      await mainPage.waitForPixels();
      await mainPage.waitForMemoryResults();
      await mainPage.resetButton.click();
      await mainPage.waitForClearScreen();

      return Promise.resolve();
    }, 10);

    await mainPage.getConsoleLogResults();

    // const paintMetrics = await mainPage.page.evaluate(() => performance.getEntriesByType('paint'));
    // console.log('Paint Metrics:', paintMetrics);

    // const longTaskObserver = new PerformanceObserver((entryList) => {
    //   const longTasks = entryList.getEntries();
    //   console.log('Long Tasks:', longTasks);
    // });
    //
    // longTaskObserver.observe({ type: 'longtask' });
  });
});
