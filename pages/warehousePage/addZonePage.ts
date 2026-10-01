import { expect, Locator, Page } from "@playwright/test";

export class addNewZone {

    readonly page: Page;
    readonly btnAddZone: Locator;
    readonly txtZoneId: Locator;
    readonly txtZoneName: Locator;
    readonly txtSortOrder: Locator;
    readonly btnsaveZone: Locator;

    //bin
    readonly btnbin: Locator;
    readonly btnAddBin: Locator;
    readonly txtBinCode: Locator;
    readonly brpZone: Locator;
    readonly Description: Locator;
    readonly btnCreateBin: Locator;

    //add receving stock
    readonly clickZone: Locator;
    readonly clickbtnReciveStock: Locator;
    readonly txtSearchItem: Locator;
    readonly txtquantity: Locator;
    readonly txtBatchNo: Locator;
    readonly txtLotNo: Locator;
    readonly txtReceivedDate: Locator;
    readonly txtUnitCost: Locator;
    readonly btnReceiveStock: Locator;
    readonly toastMessage: Locator;

    constructor(page: Page) {

        this.page = page;
        this.btnAddZone = page.getByRole('button', { name: 'Add Zone' });
        this.txtZoneId = page.getByPlaceholder('e.g. DRY', { exact: true });
        this.txtZoneName = page.getByPlaceholder('e.g. Dry Goods', { exact: true });
        this.txtSortOrder = page.getByPlaceholder('0');
        this.btnsaveZone = page.getByRole('button', { name: 'Create Zone' });

        //bin 
        this.btnbin = page.getByRole('button', { name: 'Bins', exact: true });
        this.btnAddBin = page.getByRole('button', { name: 'Add Bin' });
        this.txtBinCode = page.getByPlaceholder('e.g. A-01-01', { exact: true });
        this.brpZone = page.getByRole('button', { name: 'Unassigned', exact: true });
        this.Description = page.getByPlaceholder('e.g. Aisle A, Rack 1, Shelf 1', { exact: true });
        this.btnCreateBin = page.getByRole('button', { name: 'Create Bin', exact: true });

        //add receving stock
        this.clickZone = this.page.getByText('Colombo Zone', { exact: true });
        this.clickbtnReciveStock = page.getByRole('button', { name: 'Receive Stock', exact: true });
        this.txtSearchItem = page.getByPlaceholder('Search item code or description…');
        this.txtquantity = page.locator('input[type="number"][placeholder="0"]');
        this.txtBatchNo = page.getByPlaceholder('BATCH-2026-001');
        this.txtLotNo = page.getByPlaceholder('LOT-001');
        this.txtReceivedDate = page.locator('input[type="date"]');
        this.txtUnitCost = page.getByPlaceholder('0.00', { exact: true });
        this.btnReceiveStock = page.getByRole('dialog').getByRole('button', {name: 'Receive Stock',exact: true});
        this.toastMessage = this.page.getByRole('alert');
    }

    async AddZoneDetails(
        zoneid: string,
        zonename: string,
        zoneOrder: string
    ) {
        await this.btnAddZone.click();
        await this.txtZoneId.fill(zoneid);
        await this.txtZoneName.fill(zonename);
        await this.txtSortOrder.fill(zoneOrder);
        await this.btnsaveZone.click();
    }
    async verifyZoneCreatedToast() {
        await expect(this.page.getByRole('alert')).toHaveText(/Zone [A-Za-z0-9_]+ created\./);
    }
    async clickBin(
        bincode: string,
        description: string
    ) {
        await this.btnbin.click();
        await this.btnAddBin.click();
        await this.txtBinCode.fill(bincode);
        await this.brpZone.click();
        await this.page.getByRole('option').nth(3).click();
        await this.Description.fill(description);
        await this.btnCreateBin.click();
    }
    async verifyBinCreatedToast() {
        await expect(this.page.getByRole('alert')).toHaveText(/Bin [A-Za-z0-9_]+ created\./);
    }
    async viewStock() {
        await this.btnbin.click();
        await this.clickZone.click();
        await this.clickbtnReciveStock.click();
    }
    async searchAndSelectItem(itemCode: string) {
        await this.txtSearchItem.fill(itemCode);

        const itemButton = this.page
            .getByRole('button')
            .filter({
                has: this.page.getByText(itemCode, { exact: true })
            });

        await itemButton.click();
    }
    async addStockDetails(
        quantity: string,
        batchNo: string,
        lotNo: string,
        receivedDate: string,
        unitCost: string
    ) {
        // Quantity
        await this.txtquantity.fill(quantity);
        await this.txtBatchNo.fill(batchNo);
        await this.txtLotNo.fill(lotNo);
        await this.txtReceivedDate.fill(receivedDate);
        await this.txtUnitCost.fill(unitCost);
        await this.btnReceiveStock.click();
        await expect(this.toastMessage).toContainText('Stock received into bin successfully.');
    }


}