import { test, expect } from '../fixtures/testData';
import { LoginPage } from '../page-objects/LoginPage';
import { HomePage } from '../page-objects/HomePage';
import { CartPage } from '../page-objects/CartPage';

test.describe('Inventory Page Functionality', () => {
    test.beforeEach(async ({ page, testData }) => {
      page.setDefaultTimeout(60000);  //Added for debugging
      // Login before each test
      const loginPage = new LoginPage(page);
      const homePage = new HomePage(page);
      const { username, password } = testData.users.standard;
      
      console.log('Navigating to login page');
      await loginPage.goto();
      
      console.log('Attempting login');
      await loginPage.login(username, password);
      await homePage.waitForPageLoad();
    });
  
    test('should display all inventory items', async ({ page }) => {
      const inventoryPage = new HomePage(page);
      await inventoryPage.waitForPageLoad();
      
      // Verifyng that atleast 6 product are displayed
      const count = await inventoryPage.getProductsCount();
      expect(count).toBeGreaterThanOrEqual(6);
    });
  
    test('should add product to cart', async ({ page, testData }) => {
      const inventoryPage = new HomePage(page);
      const header = inventoryPage.header;
      const productName = testData.products.backpack.name;
      
      await inventoryPage.waitForPageLoad();
      
      
      expect(await header.getCartCount()).toBe(0);
      
      // Add a product to cart
      await inventoryPage.addProductToCart(productName);
      
      // Verify cart count increased to 1
      expect(await header.getCartCount()).toBe(1);
    });
  
    test('should sort products by price (low to high)', async ({ page }) => {
      const inventoryPage = new HomePage(page);
      
      await inventoryPage.waitForPageLoad();
      await inventoryPage.sortProducts('lohi');
      
      
      const priceTexts = await page.locator('.inventory_item_price').allTextContents();
      const prices = priceTexts.map(text => parseFloat(text.replace('$', '')));
      
      // Verify prices are in ascending order
      for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
      }
    });
  });