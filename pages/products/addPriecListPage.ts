import { Locator, Page } from "@playwright/test";

export class addNewPriceList {

    readonly page: Page;
    readonly txtPriceListName: Locator;
    readonly txtDesFiled: Locator;
    readonly drpCurrencyType: Locator;
    readonly btnValidFrom: Locator;
    readonly btnValidTo: Locator;


    constructor(page: Page) {
        this.page = page;
        this.txtPriceListName = page.getByPlaceholder('e.g. Standard Retail Price List 2026');
        this.txtDesFiled = page.getByPlaceholder('e.g. Default price list for all retail customers');
        this.drpCurrencyType = page.getByRole('button', { name: 'USD', exact: true });
        this.btnValidFrom = page.locator('input[type="date"]');
        this.btnValidTo = page.locator('input[type="date"]').nth(1);

    }
    
    async enterPriceListName(priceListName: string) {
        await this.txtPriceListName.fill(priceListName);
    }
    async enterDescription(description: string) {
        await this.txtDesFiled.fill(description);
    }
    async selectCurrencyLKR() {
        await this.drpCurrencyType.click();
        await this.page.getByRole('option', { name: 'LKR', exact: true }).click();
    }
    async selectValidFromToday() {
        const today = new Date().toISOString().split('T')[0];
        await this.btnValidFrom.fill(today);

    } async selectValidToNextMonth30() {
        const today = new Date();
        const nextMonth30 = new Date(today.getFullYear(), today.getMonth() + 1, 30);
        const date = nextMonth30.toISOString().split('T')[0];
        await this.btnValidTo.fill(date);
    }
}