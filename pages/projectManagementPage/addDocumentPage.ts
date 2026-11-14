import { expect, Locator, Page } from "@playwright/test";

export class addDocument {
    readonly page: Page;
    readonly btnDocuments: Locator;
    readonly btnUpload: Locator;
    readonly drpCategoary: Locator;
    readonly fileUpload:Locator;
    readonly txtDocumentDescription: Locator;
    readonly successToast: Locator;

    constructor(page: Page) {
        this.page = page;
        this.btnDocuments = page.getByRole('button', { name: 'Documents', exact: true });
        this.btnUpload = page.getByRole('button', { name: 'Upload', exact: true });
        this.drpCategoary = page.locator('button[aria-haspopup="listbox"]').filter({ hasText: 'Contracts' });
        this.fileUpload = page.locator('input[type="file"]');
        this.txtDocumentDescription = page.getByTestId('document-form-description-input');
        this.btnUpload = page.getByRole('button', { name: 'Upload', exact: true }).last();
        this.successToast = page.locator('.Toastify__toast--success');
    }
    async addNewDocument() {
        await this.btnDocuments.click();
        await this.btnUpload.click();
        await this.drpCategoary.click();
        await this.page.getByRole('option', { name: 'Reports', exact: true }).click();
        await this.fileUpload.setInputFiles('uploads\\report.png');
        await this.txtDocumentDescription.fill('Employment contract document.');
        await this.btnUpload.click();
        await expect(this.successToast).toContainText('Document uploaded.');
    }
}