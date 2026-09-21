import { expect, Locator, Page } from "@playwright/test";

export class importSupplier {

    readonly page: Page;
    readonly btnDownloadTemplate: Locator;
    readonly fileUpload: Locator;
    readonly btnUploadPreview: Locator;

    constructor(page: Page) {
        this.page = page;
        this.btnDownloadTemplate = page.getByRole('button', { name: 'Download Template' });
        this.fileUpload = page.locator('input[type="file"]');
        this.btnUploadPreview = page.getByRole('button', { name: 'Upload & Preview' });
    }

    async clickDownloadTemplate() {
        await this.btnDownloadTemplate.click();
    }
    async verifyUploadPreviewDisabled() {
        await expect(this.btnUploadPreview).toBeDisabled();
           console.log('Upload & Preview button is disabled before importing Excel');
    }
    async uploadExcelFile() {
        await this.fileUpload.setInputFiles('uploads\\import_suppliers.xlsx');
    }
     async verifyUploadPreviewEnabled() {
        await expect(this.btnUploadPreview).toBeEnabled();
        console.log('Upload & Preview button is Eisabled after importing Excel');
    }
     async clickUploadPreview() {
        await this.btnUploadPreview.click();
    }
    
}
