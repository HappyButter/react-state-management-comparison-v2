import { test, expect } from './pages/page';

test.describe('Performance tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('ContextAPI', async ({ mainPage }) => {
    await expect(mainPage.page).toHaveTitle(/ManageState/);

    // Start measuring the performance.
    // await page.evaluate(() => performance.mark('start'));
    // Click the button.

    await mainPage.fillConfigurations('ContextAPI', 300);
    await mainPage.applyButton.click();
    await mainPage.waitForPixels();

    // const paintMetrics = await mainPage.page.evaluate(() => performance.getEntriesByType('paint'));
    // console.log('Paint Metrics:', paintMetrics);

    // const longTaskObserver = new PerformanceObserver((entryList) => {
    //   const longTasks = entryList.getEntries();
    //   console.log('Long Tasks:', longTasks);
    // });
    //
    // longTaskObserver.observe({ type: 'longtask' });
  });

  // test('Reset control panel', async ({ page }) => {
  // Click the reset button.
  // await page.click('text=Reset');

  // get Reset input button
  // const resetButton = page.locator('input[id="reset"]');
  // await expect(resetButton).toBeVisible();

  // get Reset input button from form with id "control-panel"

  // });
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');
//
//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();
//
//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
