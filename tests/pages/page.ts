import { test as base } from '@playwright/test';
import { MainPage } from './mainPage';

export type PagesTypes = {
  mainPage: ReturnType<typeof MainPage>;
};

export const test = base.extend<PagesTypes>({
  async mainPage({ page }, use) {
    await use(MainPage(page));
  }
});

export { expect } from '@playwright/test';