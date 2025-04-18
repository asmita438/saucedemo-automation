import { LoginPage } from '../page-objects/LoginPage';
import { HomePage } from '../page-objects/HomePage';
import { TestData, test as testDataTest } from './testData';

// Extend the fixture with loggedIn functionality
export const test = testDataTest.extend<{ loggedInPage: HomePage }>({
  loggedInPage: async ({ page, testData }, use) => {
    // Log in with standard user
    const loginPage = new LoginPage(page);
    const inventoryPage = new HomePage(page);
    const { username, password } = testData.users.standard;
    
    await loginPage.goto();
    await loginPage.login(username, password);
    await inventoryPage.waitForPageLoad();
    
    // Pass the logged in page to the test
    await use(inventoryPage);
  }
});

export { expect } from '@playwright/test';
