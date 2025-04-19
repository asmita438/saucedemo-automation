import { Page, Locator, expect } from '@playwright/test';
import { Header } from '@components/Header';

export class CartPage {
  readonly page: Page;
  readonly header: Header;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async goto() {
    await this.page.goto('/cart.html');
    await expect(this.checkoutButton).toBeVisible();
  }

  async waitForPageLoad() {
    await expect(this.page).toHaveURL(/.*cart.html/);
    await expect(this.checkoutButton).toBeVisible();
  }

  async removeItem(itemName: string) {
    const item = this.cartItems.filter({ hasText: itemName });
    await item.locator('button').filter({ hasText: 'Remove' }).click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async getCartItemsCount() {
    return await this.cartItems.count();
  }

  async isItemInCart(itemName: string) {
    const count = await this.cartItems.filter({ hasText: itemName }).count();
    return count > 0;
  }
}