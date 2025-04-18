import { Page, Locator, expect } from '@playwright/test';

export class Header {
  readonly page: Page;
  readonly burgerMenu: Locator;
  readonly shoppingCart: Locator;
  readonly cartBadge: Locator;
  readonly logoutLink: Locator;
  readonly resetAppStateLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.burgerMenu = page.locator('#react-burger-menu-btn');
    this.shoppingCart = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.resetAppStateLink = page.locator('#reset_sidebar_link');
  }

  async clickShoppingCart() {
    await this.shoppingCart.click();
  }

  async openMenu() {
    await this.burgerMenu.click();
    // Wait for the menu to slide in
    await this.logoutLink.waitFor({ state: 'visible' });
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }

  async resetAppState() {
    await this.openMenu();
    await this.resetAppStateLink.click();
  }

  async getCartCount() {
    if (await this.cartBadge.isVisible()) {
      const text = await this.cartBadge.textContent();
      return parseInt(text || '0', 10);
    }
    return 0;
  }
}