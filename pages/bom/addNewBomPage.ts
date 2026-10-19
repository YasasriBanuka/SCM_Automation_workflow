import { expect, Locator, Page } from "@playwright/test";

export class addNewBom {

    readonly page: Page;
    readonly txtBomNo: Locator;
    readonly btnFinishedProduct: Locator;
    readonly txtSearchFinishedProduct: Locator;
    readonly optFinishedProduct: Locator;
    readonly txtdescription: Locator;
    readonly txtunitCost: Locator;
    readonly txtNotes: Locator;
    readonly btnSave: Locator;

    //=========Activated WorkFlow===============
    readonly rowBom: Locator;
    readonly btnActivate: Locator;

    constructor(page: Page) {
        this.page = page;
        this.txtBomNo = page.getByPlaceholder('BOM-2024-0001');
        this.btnFinishedProduct = page.getByRole('button').filter({ hasText: 'Search item by code or name…' });
        this.txtSearchFinishedProduct = page.getByPlaceholder('Search item by code or name…');
        this.optFinishedProduct = page.getByText('PKG-BOX-M', { exact: true });
        this.txtdescription = page.getByPlaceholder('e.g. Standard assembly recipe');
        this.txtunitCost = page.getByPlaceholder('0.00');
        this.txtNotes = page.getByPlaceholder('Any notes about this BOM…');
        this.btnSave = page.getByRole('button', { name: 'Create BOM' });


        this.rowBom = page.locator('tbody tr').filter({ hasText: 'BOM-2026-001' });
        this.btnActivate = page.getByRole('button', { name: 'Activate' });
    }

    async enterBomNo(bomNo: string) {
        await this.txtBomNo.fill(bomNo);
    }
    async selectFinishedProduct() {
        await this.btnFinishedProduct.click();
        await this.txtSearchFinishedProduct.fill('PKG-BOX-M');
        await this.optFinishedProduct.click();
    }
    async enterdetails(
        description: string,
        unitCost: number,
        notes: string
    ) {
        await this.txtdescription.fill(description);
        await this.txtunitCost.fill(unitCost.toString());
        await this.txtNotes.fill(notes);
    }

    async clickSave() {
        await this.btnSave.click();
    }
    async verifySuccessMessage(bomNo: string) {
        await expect(
            this.page.locator('.Toastify__toast--success')
        ).toContainText(`BOM ${bomNo} created as Draft.`);
    }

    async clickBom(bomNo: string) {
        const targetRow = this.page.locator('tbody tr').filter({
            hasText: bomNo
        });

        await expect(targetRow).toBeVisible();
        await targetRow.click();
    }

    async clickActivate() {
        await this.btnActivate.click();
    }

    async verifyBomActivatedMessage(bomNo: string) {
        await expect(
            this.page.locator('.Toastify__toast--success')
        ).toContainText(`BOM ${bomNo} activated.`);

    
    }
}