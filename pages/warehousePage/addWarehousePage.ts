import { expect, Locator, Page } from "@playwright/test";
import { LoadFnOutput } from "module";

export class addWarehouse {

    readonly page: Page;
    readonly txtWarehouseCode: Locator;
    readonly txtWarehouseName: Locator;
    readonly txtLocation: Locator;
    readonly btnaddWarehouse: Locator;
    readonly warehouseCreatedToast: Locator;
    readonly warehouseSavedToast: Locator;
    readonly btnSaveChanges: Locator;
    readonly toastMessage: Locator;
    readonly txtdeleteComment: Locator;
    readonly bthDeactivate: Locator;
    readonly btnConfirmDeactivate: Locator;
    //global variables
    constructor(page: Page) {
        this.page = page;
        this.txtWarehouseCode = page.getByPlaceholder('e.g. WH-COL-01');
        this.txtWarehouseName = page.getByPlaceholder('e.g. Colombo Main Warehouse');
        this.txtLocation = page.getByPlaceholder('e.g. 45 Industrial Zone, Colombo 15');
        this.btnaddWarehouse = page.getByRole('button', { name: 'Save Warehouse', exact: true });
        this.warehouseCreatedToast = this.page.getByRole('alert').filter({ hasText: /Warehouse .+ created successfully\./ });
        this.warehouseSavedToast = page.getByText('Warehouse saved. It will appear in the list shortly.');
        this.btnSaveChanges = page.getByRole('button', { name: 'Save Changes', exact: true });
        this.toastMessage = page.getByRole('alert');
        this.bthDeactivate = page.getByRole('button', { name: 'Deactivate', exact: true }).nth(2);
        this.txtdeleteComment = page.getByPlaceholder('Add a comment…');
        this.btnConfirmDeactivate = page.getByRole('heading', {name: 'Deactivate Warehouse?',exact: true}).locator('..').getByRole('button', { name: 'Deactivate',exact: true});
    }

    async enterWarehouseCode(Wcode: string) {
        await this.txtWarehouseCode.fill(Wcode);
    }

    async enterWarehouseName(WName: string) {
        await this.txtWarehouseName.fill(WName);
    }

    async enterWarehouseLocation(WLocation: string) {
        await this.txtLocation.fill(WLocation);
    }

    async clickAddButton() {
        await this.btnaddWarehouse.click();
    }

    async verifyWarehouseCreatedToast() {
        await expect(this.warehouseCreatedToast).toBeVisible();

        const message = await this.warehouseCreatedToast.textContent();

        console.log('Actual Message:', message);

        expect(message).toMatch(
            /^Warehouse \S+ created successfully\.$/ //Verify the warehouse creation success message with a dynamic warehouse code.

        );
    }
    async verifyWarehouseSavedToast() {
        await expect(this.warehouseSavedToast).toBeVisible();

        await expect(this.warehouseSavedToast).toContainText(
            'Warehouse saved. It will appear in the list shortly.'
        );

        console.log('Warehouse saved toast message is displayed.');

    }
    async updateWarehouse(warehouseName: string) {
        await this.page
            .getByRole('row').filter({ hasText: warehouseName }).getByRole('button', { name: 'Edit' }).click();
    }

    async clickSaveChangesButton() {
        await this.btnSaveChanges.click();
    }
    async verifyWarehouseUpdatedMessage() {
        await expect(this.toastMessage).toContainText([
            'Warehouse updated successfully.',
            'Warehouse updated. Changes will appear in the list shortly.'
        ]);
    }
    async deleteWarehouse(warehouseName: string) {
        await this.page
            .getByRole('row').filter({ hasText: warehouseName }).getByRole('button', { name: 'Deactivate' }).click();
             console.log(`Selected warehouse: ${warehouseName}`);
    }

    async addComment(comment: string) {
        await this.txtdeleteComment.fill(comment);
    }
    async clickDeactivateButton() {
        await this.btnConfirmDeactivate.click();
    }

    async verifyWarehouseDeletedMessage() {
       await expect(this.page.getByRole('alert'))
        .toContainText('Warehouse deactivated.');
    }
    
}