import { test, expect } from '../fixtures/baseTest';

test.describe('Using Pre-logged in Fixture', () => {
  test('should add multiple products to cart', async ({ loggedInPage, testData }) => {
    const header = loggedInPage.header;
    
    // Add multiple products to cart
    await loggedInPage.addProductToCart(testData.products.backpack.name);
    await loggedInPage.addProductToCart(testData.products.bikeLight.name);
    await loggedInPage.addProductToCart(testData.products.boltTshirt.name);
    
    // Verify cart count increased to 3
    expect(await header.getCartCount()).toBe(3);
  });
  
  test('should verify product details', async ({ loggedInPage, testData, page }) => {
    // Click on a specific product to view details
    await loggedInPage.clickOnProduct(testData.products.fleeceJacket.name);
    
    // Verify product details are displayed correctly
    const productTitle = page.locator('.inventory_details_name');
    const productPrice = page.locator('.inventory_details_price');
    const productDesc = page.locator('.inventory_details_desc');
    
    await expect(productTitle).toHaveText(testData.products.fleeceJacket.name);
    await expect(productPrice).toContainText(`$${testData.products.fleeceJacket.price}`);
    await expect(productDesc).toHaveText(testData.products.fleeceJacket.description);
  });
});