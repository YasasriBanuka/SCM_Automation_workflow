import { expect, Locator, Page } from '@playwright/test';

export class navigateRawMaterialPage {

    readonly page: Page;
    readonly lblRawMaterial: Locator;
    readonly lblRawMaterials: Locator;
    readonly btnAddRawMaterial: Locator;
    readonly btnImportRawMaterial: Locator;
    readonly btnExportRawMaterial: Locator;
    readonly clickValue: Locator;
    readonly clickDeactivateValue: Locator;
   readonly clickCannotDeactivation: Locator;



    constructor(page: Page) {
        this.page = page;
        this.lblRawMaterial = page.getByRole('button', { name: 'Raw Materials', exact: true });
        this.lblRawMaterials = page.getByRole('link', { name: 'Raw Materials', exact: true });
        this.btnAddRawMaterial = page.getByRole('button', { name: 'Add Raw Material', exact: true });
        this.btnImportRawMaterial = page.getByRole('button', { name: 'Import' });
        this.btnExportRawMaterial = page.getByRole('button', { name: 'Export' });
        this.clickValue = page.locator('tbody tr').filter({ hasText: 'RM_010' });
        this.clickDeactivateValue = page.locator('tbody tr').filter({ hasText: 'RM_002' });
        this.clickCannotDeactivation = page.locator('tbody tr').filter({ hasText: 'RM_001' });
    }
    async clickLblRawMaterial() {
        await this.lblRawMaterial.click();
    }
    async ClicklblRawMaterials() {
        await this.lblRawMaterials.click();
    }
    async clickbbtnAddRawMaterial() {
        await this.btnAddRawMaterial.click();
    }
    async clickImport() {
        await this.btnImportRawMaterial.click();
    }
    async clickExport() {
        await this.btnExportRawMaterial.click();
    }

    async clickRMRow() {
        await this.clickValue.click();
    }
    async clickDeactivatevalue() {
        await this.clickDeactivateValue.click();
    }
    async clickCannotDeactivationvalue() {
    await this.clickCannotDeactivation.click();
}
}