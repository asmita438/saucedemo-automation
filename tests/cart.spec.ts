import { test, expect } from '../fixtures/testData';
import { LoginPage } from '../page-objects/LoginPage';
import { HomePage } from '../page-objects/HomePage';
import { CartPage } from '../page-objects/CartPage';
import { CheckoutPage } from '../page-objects/CheckoutPage';
import { Header } from '../page-objects/Components/Header';

test.describe('Shopping Cart Functionality', () => {
  test.beforeEach(async ({ page, testData }) => {
    // Login and add an item to cart before each test
    const loginPage = new LoginPage(page);
    const inventoryPage = new HomePage(page);
    const { username, password } = testData.users.standard;
    const productName = testData.products.backpack.name;
    
    await loginPage.goto();
    await loginPage.login(username, password);
    await inventoryPage.waitForPageLoad();
    await inventoryPage.addProductToCart(productName);
  });

  test('should display correct items in cart', async ({ page, testData }) => {
    const header = new Header(page);
    const cartPage = new CartPage(page);
    const productName = testData.products.backpack.name;
    
    await header.clickShoppingCart();
    await cartPage.waitForPageLoad();
    
    // Verify the item is in the cart
    expect(await cartPage.isItemInCart(productName)).toBeTruthy();
    expect(await cartPage.getCartItemsCount()).toBe(1);
  });

  test('should remove item from cart', async ({ page, testData }) => {
    const header = new Header(page);
    const cartPage = new CartPage(page);
    const productName = testData.products.backpack.name;
    
    await header.clickShoppingCart();
    await cartPage.waitForPageLoad();
    
    // Remove the item
    await cartPage.removeItem(productName);
    
    // Verify item was removed
    expect(await cartPage.getCartItemsCount()).toBe(0);
    expect(await header.getCartCount()).toBe(0);
  });

  test('should navigate from cart to checkout', async ({ page }) => {
    const header = new Header(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    
    await header.clickShoppingCart();
    await cartPage.waitForPageLoad();
    await cartPage.proceedToCheckout();
    
    // Verify navigation to checkout page
    await checkoutPage.waitForCheckoutStepOne();
  });
});