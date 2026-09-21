import { expect, Locator, Page } from "@playwright/test";

export class verifyInValidSupplierData {

    readonly page: Page;
    readonly txtImportWarning: Locator;
    readonly txtCompanyName: Locator;
    readonly txtContactEmail: Locator;
    readonly btnRevalidateRow: Locator;

    readonly btnImportOneRow: Locator;
    readonly btnDone: Locator;
    readonly toastSupplierImported: Locator;


    constructor(page: Page) {
        this.page = page;
        this.txtImportWarning = page.getByText(
            '1 row will be skipped — only 0 rows will be imported. Use the pencil icon to fix a row and re-validate it.');
        this.txtCompanyName = page.locator('label').filter({ hasText: 'Company Name' }).locator('..').locator('input');
        this.txtContactEmail = page.locator('label').filter({ hasText: 'Contact Email' }).locator('..').locator('input');
        this.btnRevalidateRow = page.getByRole('button', { name: 'Revalidate row' });
        this.btnImportOneRow = page.getByRole('button', { name: 'Import 1 Row' });
        this.btnDone = page.getByRole('button', { name: 'Done' });
        this.toastSupplierImported = page.getByRole('alert').filter({ hasText: '1 supplier imported as Draft.' });
    }
    async verifyExistDataExportWarning() {
        await expect( this.txtImportWarning).toContainText(
            '1 row will be skipped — only 0 rows will be imported. Use the pencil icon to fix a row and re-validate it.'
        );
        
    }

    async reCompanyName(
        companyName: string
    ) {
        await this.txtCompanyName.click();
        await this.txtCompanyName.fill(companyName);
    }
    async reEnterContactEmail(
        contactEmail: string
    ) {
        await this.txtContactEmail.click();
        await this.txtContactEmail.fill(contactEmail);
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



