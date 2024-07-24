import { test, expect } from '@playwright/test';

test.describe('Performance tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/ManageState/);
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
