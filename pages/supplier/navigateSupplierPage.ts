import { Locator, Page } from '@playwright/test';

export class navigateSupplierPage {

    readonly page: Page;
    readonly lblSupplier: Locator;
    readonly lblDirectory: Locator;
    readonly btnAddSupplier: Locator;
    readonly btnImportSupplier: Locator;
    readonly btnExportSupplier: Locator;

    constructor(page: Page) {
        this.page = page;
        this.lblSupplier = page.getByText('Suppliers', { exact: true });
        this.lblDirectory = page.getByRole('link', { name: 'Directory', exact: true });
        this.btnAddSupplier = page.getByRole('button', { name: 'Add Supplier', exact: true });
        this.btnImportSupplier = page.getByRole('button', { name: 'Import' });
        this.btnExportSupplier = page.getByRole('button', { name: 'Export' });
    }
    async clickLblSupplier() {
        await this.lblSupplier.click();
    }
    async ClicklblDirectory() {
        await this.lblDirectory.click();
    }
    async clickbtnAddSupplier(){
        await this.btnAddSupplier.click();
    }
    async clickImport() {
        await this.btnImportSupplier.click();
    }
    async clickExport() {
        await  this.btnExportSupplier.click();
    }
}