import { expect, Locator, Page } from "@playwright/test";

export class generatePickListPage {

    readonly page: Page;
    readonly btnWarehouse: Locator;
    readonly btnColomboWarehouse: Locator;
    readonly btnPickBy: Locator;
    readonly optionPickByProduct: Locator;
    readonly btnAddOrder: Locator;
    readonly txtSearchSalesOrder: Locator;
    readonly optionSalesOrder: Locator;
    readonly btnDone: Locator;
    readonly btnGeneratePickList: Locator;
    readonly btnassginPicker: Locator;
    readonly searchPicker: Locator;
    readonly btnAssign: Locator;
    readonly btnPick: Locator;
    readonly txtPickNote: Locator;
    readonly btnConfirmPick:Locator;

    constructor(page: Page) {
        this.page = page;
        this.btnWarehouse = page.getByRole('button', { name: 'Select warehouse…', exact: true });
        this.btnColomboWarehouse = page.getByText('Colombo_01 (WH_001)', { exact: true });
        this.btnPickBy = page.getByRole('button', { name: 'Pick by Order', exact: true });
        this.optionPickByProduct = page.getByText('Pick by Product', { exact: true });
        this.btnAddOrder = page.getByRole('button', { name: 'Add Orders', exact: true });
        this.txtSearchSalesOrder = page.getByPlaceholder('Search by Sales Order number', { exact: true });
        this.optionSalesOrder = page.getByText('SO-2026-0006', { exact: true });
        this.btnDone = page.getByRole('button', { name: 'Done', exact: true });
        this.btnGeneratePickList = page.getByRole('button', { name: 'Generate Pick List', exact: true });
        this.btnassginPicker = page.getByRole('button', { name: 'Assign Picker', exact: true });
        this.searchPicker = page.getByPlaceholder('Search by name or email…', { exact: true });
        this.btnAssign = page.getByRole('button', { name: 'Assign', exact: true });
        this.btnPick = page.getByRole('button', { name: 'Pick', exact: true });
        this.txtPickNote = page.getByPlaceholder('Any notes about this pick…');
        this.btnConfirmPick = page.getByRole('button', { name: 'Confirm Pick', exact: true });
    }

    async selectWarehouse() {
        await this.btnWarehouse.click();
        await this.btnColomboWarehouse.click();
        await this.btnPickBy.click();
        await this.optionPickByProduct.click();
        await this.btnAddOrder.click();
        await this.txtSearchSalesOrder.fill('SO-2026-0006');
        const btnSalesOrder = this.page.getByRole('button', { name: /SO-2026-0006/, exact: true });
        await btnSalesOrder.click();
        await this.btnDone.click();
        await this.btnGeneratePickList.click();
        await expect(this.page.getByText('Pick list generated successfully.Redirection…', { exact: true })).toBeVisible();
    }
    async assignPicker() {
        await this.btnassginPicker.click();
        await this.searchPicker.fill('Yasasri');
        const optionPicker = this.page.getByText('Yasasri Banuka Dias Wimalaweera');
        await optionPicker.click();
        await this.btnAssign.click();
        
    }
    async clickPick(picknote: string) {
        await this.btnPick.click();
        await this.txtPickNote.fill(picknote);
        await this.btnConfirmPick.click();
    }
}