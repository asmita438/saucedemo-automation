import { test, expect } from '../fixtures/testData';
import { LoginPage } from '../page-objects/LoginPage';
import { HomePage } from '../page-objects/HomePage';


test.describe('Login Functionality', () => {
  test('should login successfully with valid credentials', async ({ page, testData }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const { username, password } = testData.users.standard;
    await loginPage.goto();
    await loginPage.login(username, password);
    
    
    await homePage.waitForPageLoad();
  });

  test('should show error with invalid credentials', async ({ page, testData }) => {
    const loginPage = new LoginPage(page);
    const { username, password } = testData.users.invalid;
    await loginPage.goto();
    await loginPage.login(username, password);
    
    // Verify error message is displayed
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Username and password do not match');
  });

  test('should show error for locked out user', async ({ page, testData }) => {
    const loginPage = new LoginPage(page);
    const{ username, password } = testData.users.locked;
    await loginPage.goto();
    await loginPage.login(username, password);
    
    // Verify error message for locked out user
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Epic sadface: Sorry, this user has been locked out.');
  });
});
