import { test, expect } from '../fixtures/testData';
import { LoginPage } from '../page-objects/LoginPage';
import { HomePage } from '../page-objects/HomePage';
import { CartPage } from '../page-objects/CartPage';
import { CheckoutPage } from '../page-objects/CheckoutPage';
import { Header } from '../page-objects/Components/Header';

test.describe('Checkout Process', () => {
  test.beforeEach(async ({ page, testData }) => {
    // Login, add item to cart, and navigate to checkout
    const loginPage = new LoginPage(page);
    const inventoryPage = new HomePage(page);
    const header = new Header(page);
    const cartPage = new CartPage(page);
    const { username, password } = testData.users.standard;
    const productName = testData.products.backpack.name;
    
    await loginPage.goto();
    await loginPage.login(username, password);
    await inventoryPage.waitForPageLoad();
    await inventoryPage.addProductToCart(productName);
    await header.clickShoppingCart();
    await cartPage.waitForPageLoad();
    await cartPage.proceedToCheckout();
  });

  test('should complete checkout process successfully', async ({ page, testData }) => {
    const checkoutPage = new CheckoutPage(page);
    const { firstName, lastName, postalCode } = testData.users.standard;
    
    await checkoutPage.waitForCheckoutStepOne();
    await checkoutPage.fillShippingInfo(firstName, lastName, postalCode);
    
    // Verify navigation to checkout step two
    await checkoutPage.waitForCheckoutStepTwo();
    
    // Complete the order
    await checkoutPage.completeOrder();
    
    // Verify order completion
    await checkoutPage.waitForOrderCompletion();
  });

  test('should show error with empty checkout information', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    
    await checkoutPage.waitForCheckoutStepOne();
    // Try to continue without filling info
    await checkoutPage.continueButton.click();
    
    // Verify error message
    await expect(checkoutPage.errorMessage).toBeVisible();
  });

  test('should calculate correct total with tax', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    
    await checkoutPage.waitForCheckoutStepOne();
    await checkoutPage.fillShippingInfo('John', 'Doe', '12345');
    await checkoutPage.waitForCheckoutStepTwo();
    
    // Get price values
    const subtotal = await checkoutPage.getSubtotal();
    const tax = await checkoutPage.getTax();
    const total = await checkoutPage.getTotal();
    
    // Verify total calculation (allowing for small rounding differences)
    expect(Math.abs((subtotal + tax) - total)).toBeLessThan(0.01);
  });
});