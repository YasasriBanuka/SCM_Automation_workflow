import { expect, Locator, Page } from "@playwright/test";

export class addMaterialIssue {

    readonly page: Page;
    readonly btnMaterial: Locator;
    readonly btnIssueMaterial: Locator;
    readonly btnSelectWarehouse: Locator;
    readonly txtSearchRawMaterial: Locator;
    readonly txtQuantity: Locator;
   // readonly btnSelectUOM: Locator;
    readonly txtUnitPrice: Locator;
    readonly btnSelectTask: Locator;
    readonly txtNotes: Locator;
    readonly btnIssue:Locator;

    constructor(page: Page) {
        this.page = page;
        this.btnMaterial = page.getByRole('button', { name: 'Materials', exact: true });
        this.btnIssueMaterial = page.getByRole('button', { name: 'Issue Material', exact: true });
        this.btnSelectWarehouse = page.locator('button[aria-haspopup="listbox"]').filter({ hasText: 'Select warehouse' });
        this.txtSearchRawMaterial = page.getByTestId('item-picker-raw-material-input');
        this.txtQuantity = page.getByTestId('material-issue-form-quantity-input');
       // this.btnSelectUOM = page.locator('button[aria-haspopup="listbox"]').filter({ hasText: '— Select UOM —' });
        this.txtUnitPrice = page.getByTestId('material-issue-form-unit-price-input');
        this.btnSelectTask = page.locator('button[aria-haspopup="listbox"]').filter({ hasText: 'Project level' });
        this.txtNotes = page.getByTestId('material-issue-form-notes-input');
        this.btnIssue = page.getByRole('button', {name: 'Issue', exact: true});
    }

    async addNewMaterialIssue() {
        await this.btnMaterial.click();
        await this.btnIssueMaterial.click();
        await this.btnSelectWarehouse.click();
        await this.page.getByRole('option', { name: 'Colombo_01', exact: true }).click();
        await this.txtSearchRawMaterial.fill('001');
        await this.page.getByText('RM_001 · Electronic Material', { exact: true }).click();
        await this.txtQuantity.fill('10');
        await this.txtUnitPrice.fill('1500');
        await this.btnSelectTask.click();
        await this.page.getByRole('option', {name:'TSK-0001',exact:true }).click();
        await this.txtNotes.fill('Material issued for project development.');
        await this.btnIssue.click();
        



    }
}