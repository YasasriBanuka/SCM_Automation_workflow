import { expect, Locator, Page } from "@playwright/test";

export class verifyValidSupplierData {

    readonly page: Page;
    readonly btnEditRow2: Locator;
    readonly txtContactTitle: Locator;
    readonly btnRevalidateRow: Locator;
    readonly btnImportOneRow: Locator;
    readonly btnDone: Locator;
    readonly toastSupplierImported: Locator;


    constructor(page: Page) {
        this.page = page;
        this.btnEditRow2 = page.locator('button[aria-label="Edit row 2"]');
        this.txtContactTitle = page.locator('label:has-text("Contact Title")').locator('..').locator('input');
        this.btnRevalidateRow = page.getByRole('button', { name: 'Revalidate row' });
        this.btnImportOneRow = page.getByRole('button', { name: 'Import 1 Row' });
        this.btnDone = page.getByRole('button', { name: 'Done' });
        this.toastSupplierImported = page.getByRole('alert').filter({ hasText: '1 supplier imported as Draft.'});
    }
    async clickEditRow2() {
        await this.btnEditRow2.click();
    }
    async reEnterTitle(
        contactTitle: string
    ) {
        await this.txtContactTitle.click();
        await this.txtContactTitle.fill(contactTitle);
    }
    async clickRevalidateRow() {
        await this.btnRevalidateRow.click();
    }
    async clickImportOneRow() {
        await this.btnImportOneRow.click();
    }
    async clickDone() {
        await this.btnDone.click();
    }
    async verifySupplierImportedMessage() {
    await expect(this.toastSupplierImported).toContainText(
        '1 supplier imported as Draft.'
    );
}
}



