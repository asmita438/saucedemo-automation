import { Page, Locator, expect } from '@playwright/test';
import { Header } from './Components/Header';

export class HomePage {
    readonly page: Page;
    readonly header: Header;
    readonly inventoryItems: Locator;
    readonly sortDropdown: Locator;
    readonly productTitle: Locator;
    readonly productPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(page);
        this.inventoryItems = page.locator('.inventory_item');
        this.sortDropdown = page.locator('[data-test="product_sort_container"]');
        this.productTitle = page.locator('.inventory_item_name');
        this.productPrice = page.locator('.inventory_item_price');
      }

      async waitForPageLoad() {
        
        await expect(this.page).toHaveURL(/.*inventory.html/);
        await expect(this.inventoryItems.first()).toBeVisible();
      }

      async addProductToCart(productName: string) {
        
        const productCard = this.page.locator('.inventory_item')
          .filter({ hasText: productName });
        
        await productCard.locator('button').filter({ hasText: 'Add to cart' }).click();
      }

      async clickOnProduct(productName: string) {
        await this.page.locator('.inventory_item_name').filter({ hasText: productName }).click();
      }

      async sortProducts(option: 'az' | 'za' | 'lohi' | 'hilo') {
        const optionValues = {
          az: 'az',
          za: 'za',
          lohi: 'lohi',
          hilo: 'hilo'
        };
        await this.sortDropdown.selectOption(optionValues[option]);
      }
      async getProductsCount() {
        return await this.inventoryItems.count();
      }
    }