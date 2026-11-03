import { Locator, Page } from "@playwright/test";

export class addMrp {

    readonly page: Page;
    readonly txtSearchBOM: Locator;
    readonly optBOM: Locator;
    readonly txtStartDate: Locator;
    readonly txtEndDate: Locator;
    readonly btnWarehouse: Locator;
    readonly optColombo: Locator;
    readonly txtNote: Locator;
    readonly btnRunMrp:Locator;

    constructor(page: Page) {

        this.page = page;
        this.txtSearchBOM = page.getByPlaceholder('Search active BOMs…', { exact: true });
        this.optBOM = page.getByText('BOM-2026-001', { exact: true });
        this.txtStartDate = page.locator('input[type="date"]').nth(0);
        this.txtEndDate = page.locator('input[type="date"]').nth(1);

        this.btnWarehouse = page.getByRole('button', { name: 'Scope to a single warehouse…', exact: true });
        this.optColombo = page.locator('button').filter({hasText: 'Colombo_01 (WH_001)'});
        this.txtNote = page.getByPlaceholder('Optional notes for this planning run…');
        this.btnRunMrp = page.getByRole('button',{name:'Run MRP',exact:true});Udpa
    }
    async createMrp() {
        await this.txtSearchBOM.fill('BOM-2026-001');
        await this.optBOM.waitFor({ state: 'visible' });
        await this.optBOM.click();
        await this.txtStartDate.fill('2026-11-03');
        await this.txtEndDate.fill('2026-12-03');

        await this.btnWarehouse.click();
        await this.optColombo.click();

        await this.txtNote.fill('This planning run is prepared for the Colombo warehouse based on the expected demand, available stock, and upcoming production requirements.');

        await this.btnRunMrp.click();

    }
}