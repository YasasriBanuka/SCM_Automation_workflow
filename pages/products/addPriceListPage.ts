import { expect, Locator, Page } from "@playwright/test";

export class addNewPriceList {

    readonly page: Page;
    readonly txtPriceListName: Locator;
    readonly txtDesFiled: Locator;
    readonly drpCurrencyType: Locator;
    readonly btnValidFrom: Locator;
    readonly btnValidTo: Locator;
    readonly txtItemSearch: Locator;
    readonly ItemSearch: Locator;
    readonly txtUnitPrice: Locator;
    readonly txtMinQty: Locator;
    readonly txtNotes: Locator;

    readonly btnSavePriceList: Locator;
    readonly toastPriceListSaved: Locator;

    constructor(page: Page) {

        this.page = page;

        this.txtPriceListName = page.getByPlaceholder('e.g. Standard Retail Price List 2026');
        this.txtDesFiled = page.getByPlaceholder('e.g. Default price list for all retail customers');
        this.drpCurrencyType = page.getByRole('button', { name: 'USD', exact: true });
        this.btnValidFrom = page.locator('input[type="date"]').nth(0);
        this.btnValidTo = page.locator('input[type="date"]').nth(1);
        this.txtItemSearch = page.getByRole('button', { name: 'Search by item code or description…', exact: true });
        this.ItemSearch = page.getByPlaceholder('Search by item code or description…');

        this.txtUnitPrice = page.getByPlaceholder('0.00', { exact: true });
        this.txtMinQty = page.getByPlaceholder('1', { exact: true });
        this.txtNotes = page.getByPlaceholder('e.g. Bulk discount applies', { exact: true });

        this.btnSavePriceList = page.getByRole('button', { name: 'Save Price List', exact: true });
        this.toastPriceListSaved = page.getByRole('alert').filter({ hasText: 'Price list saved. Redirecting…' });

    }

    async enterPriceListName(priceListName: string) {
        await this.txtPriceListName.fill(priceListName);
    }

    async enterDescription(description: string) {
        await this.txtDesFiled.fill(description);
    }

    async selectCurrencyLKR() {
        await this.drpCurrencyType.click();

        await this.page.getByRole('option', {
            name: 'LKR',
            exact: true
        }).click();
    }

    async selectValidFromToday() {
        const today = new Date()
            .toISOString()
            .split('T')[0];

        await this.btnValidFrom.fill(today);
    }

    async selectValidToNextMonth30() {
        const today = new Date();

        const nextMonth30 = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            30
        );

        const date = nextMonth30
            .toISOString()
            .split('T')[0];

        await this.btnValidTo.fill(date);
    }

    async searchAndSelectItem(itemCode: string) {
        // Open dropdown
        await this.txtItemSearch.click();

        // Enter search value
        await this.ItemSearch.fill(itemCode); //ItemSearch

        // Select matching item
        await this.page.getByRole('button', { name: new RegExp(itemCode) }).click();


    }

    async addLineItemData(
        lineNumber: number,
        unitPrice: string,
        minQty: string,
        notes: string
    ) {
        const line = this.page
            .locator('div.rounded-lg.border')
            .filter({ hasText: `Line ${lineNumber}` });

        await line.getByPlaceholder('0.00').fill(unitPrice);
        await line.getByPlaceholder('1').fill(minQty);
        await line
            .getByPlaceholder('e.g. Bulk discount applies')
            .fill(notes);
    }

    async clickSavePriceList() {
        await this.btnSavePriceList.click();
    }

    async verifyPriceListSavedToast() {
        await expect(this.toastPriceListSaved).toBeVisible();
    }

}


