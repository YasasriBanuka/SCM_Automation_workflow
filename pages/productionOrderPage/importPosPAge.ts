import { Locator, Page } from "@playwright/test";

export class importPosPage {

    readonly page: Page;
    readonly btnDownloadTemplate:Locator;
    readonly fileUpload: Locator;
    readonly btnUpload: Locator;
    readonly btnImportRows: Locator;
    
    constructor( page: Page) {

        this.page = page;
        this.btnDownloadTemplate = page.getByRole('button', { name: 'Download Template' });
        this.fileUpload = page.locator('input[type="file"]');
        this.btnUpload = page.getByRole('button', { name: 'Upload & Preview' });
        this.btnImportRows = page.getByRole('button', { name: /^Import \d+ Rows?$/});
    }

    async clickDownloadTemplate() {
        await this.btnDownloadTemplate.click();
        
    }
    async uploadExcelFile() {
        await this.fileUpload.setInputFiles('uploads\\import_pos.xlsx');
        await this.btnUpload.click();
        await this.btnImportRows.click();
    }
    
}
