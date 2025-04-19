import { Page, Locator, expect } from '@playwright/test';
import { Header } from '@components/Header';

export class CheckoutPage {
  readonly page: Page;
  readonly header: Header;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;
  readonly errorMessage: Locator;
  readonly checkoutItems: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly checkoutComplete: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.checkoutItems = page.locator('.cart_item');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
    this.checkoutComplete = page.locator('.checkout_complete_container');
  }

  async fillShippingInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async waitForCheckoutStepOne() {
    await expect(this.page).toHaveURL(/.*checkout-step-one.html/);
    await expect(this.continueButton).toBeVisible();
  }

  async waitForCheckoutStepTwo() {
    await expect(this.page).toHaveURL(/.*checkout-step-two.html/);
    await expect(this.finishButton).toBeVisible();
  }

  async completeOrder() {
    await this.finishButton.click();
  }

  async waitForOrderCompletion() {
    await expect(this.page).toHaveURL(/.*checkout-complete.html/);
    await expect(this.checkoutComplete).toBeVisible();
  }

  async getSubtotal() {
    const subtotalText = await this.subtotalLabel.textContent();
    return parseFloat(subtotalText?.replace('Item total: $', '') || '0');
  }

  async getTax() {
    const taxText = await this.taxLabel.textContent();
    return parseFloat(taxText?.replace('Tax: $', '') || '0');
  }

  async getTotal() {
    const totalText = await this.totalLabel.textContent();
    return parseFloat(totalText?.replace('Total: $', '') || '0');
  }
}