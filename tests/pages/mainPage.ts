import { Page } from '@playwright/test';
import { StateManagerType } from '../types/types';

export const MainPage = (page: Page) => {
  const applyButton = page.getByText('Apply');
  const resetButton = page.getByText('Reset');

  const fillConfigurations = async (stateManager: StateManagerType, gridSize: number ) => {
    await page.selectOption('select[name="selectedStateManager"]', stateManager);
    await page.fill('input[name="gridSize"]', gridSize.toString());
  }

  const waitForPixels = async () => {
    await page.waitForSelector('div[data-testid="pixel-grid"]');
  }

  return {
    page,
    applyButton,
    resetButton,
    fillConfigurations,
    waitForPixels
  };
}