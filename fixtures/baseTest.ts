import { LoginPage } from '@pages/LoginPage';
import { HomePage } from '@pages/HomePage';

import { TestData, test as testDataTest } from './testData';

//loggedIn functionality
export const test = testDataTest.extend<{ loggedInPage: HomePage }>({
  loggedInPage: async ({ page, testData }, use) => {
    // Log in with standard user
    const loginPage = new LoginPage(page);
    const inventoryPage = new HomePage(page);
    const { username, password } = testData.users.standard;
    
    await loginPage.goto();
    await loginPage.login(username, password);
    await inventoryPage.waitForPageLoad();
    
    
    await use(inventoryPage);
  }
});

export { expect } from '@playwright/test';