import { expect, Locator, Page } from "@playwright/test";

export class addNewStockPage {
    readonly page: Page;
    readonly ddlTransactionType: Locator;
    readonly btnItemDropdown: Locator;
    readonly txtSearchItem: Locator;
    readonly ddlWarehouse: Locator;
    readonly currentAvailableMessage: Locator;
    readonly txtQty: Locator;
    readonly btnPOs: Locator;
    readonly txtSearchPO: Locator;
    readonly txtUnitCost: Locator;
    readonly txtNotes: Locator;
    readonly btnSaveData: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ddlTransactionType = page.locator('select').filter({ has: page.locator('option[value="receipt"]') });
        this.btnItemDropdown = page.getByRole('button', { name: 'Select item…' });
        this.txtSearchItem = page.getByPlaceholder('Search item code or description…');
        this.ddlWarehouse = page.locator('select').filter({ has: page.locator('option[value="de22e181-134c-41aa-9446-169866d22c47"]') });
        this.currentAvailableMessage = page.locator("span", { hasText: "Current available:" });
        this.txtQty = page.locator('input[type="number"]').first();
        this.txtSearchPO = page.getByPlaceholder('Search purchase order number or supplier…');
        this.btnPOs = page.getByRole('button', { name: 'Select purchase order…' });
        this.txtUnitCost = page.locator('input[type="number"]').nth(1);
        this.txtNotes = page.locator('textarea');
        this.btnSaveData = page.getByRole('button', { name: 'Post Transaction', exact: true });
        this.successMessage = page.locator('.Toastify').getByRole('alert');
    }
    async selectTransactionType() {
        await this.ddlTransactionType.selectOption('receipt');
    }

    async selectItem(itemCode: string) {
        await this.btnItemDropdown.click();
        await this.txtSearchItem.fill(itemCode);
        await this.page.locator('button').filter({ has: this.page.locator('p', { hasText: itemCode }) }).first().click();
    }

    async selectWarehouse() {
        await this.ddlWarehouse.click();
        await this.ddlWarehouse.selectOption('de22e181-134c-41aa-9446-169866d22c47');
    }
    async getCurrentAvailable() {
        await expect(this.currentAvailableMessage).toBeVisible();

        const availableText = await this.currentAvailableMessage
            .locator("..")
            .textContent();

        console.log("Displayed Current Available:", availableText?.trim());

    }
    async enterQuantity(quantity: string) {
        await this.txtQty.fill(quantity);
    }
    async selectPos(pos: string) {
        await this.btnPOs.click();
        await this.txtSearchPO.fill(pos);
        await this.page.locator('button').filter({ has: this.page.locator('p', { hasText: pos }) }).first().click();
    }

    async enterUnitCost(unitCost: string) {
        await this.txtUnitCost.fill(unitCost);
    }
    async enterNotes(notes: string) {
        await this.txtNotes.fill(notes);
    }
    async saveTransaction() {
        await this.btnSaveData.click();
        await expect(this.successMessage).toBeVisible();
        await expect(this.successMessage).toContainText('Transaction posted.');

        console.log('Success message displayed');
    }

}
