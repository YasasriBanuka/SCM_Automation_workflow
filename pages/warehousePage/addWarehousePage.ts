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

    constructor(page: Page) {
        this.page = page;
        this.txtWarehouseCode = page.getByPlaceholder('e.g. WH-COL-01');
        this.txtWarehouseName = page.getByPlaceholder('e.g. Colombo Main Warehouse');
        this.txtLocation = page.getByPlaceholder('e.g. 45 Industrial Zone, Colombo 15');
        this.btnaddWarehouse = page.getByRole('button', { name: 'Save Warehouse', exact: true });
        this.warehouseCreatedToast = this.page.getByRole('alert').filter({ hasText: /Warehouse .+ created successfully\./ });
        this.warehouseSavedToast = page.getByText('Warehouse saved. It will appear in the list shortly.');
    
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

    async clickAddButton(){
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





}