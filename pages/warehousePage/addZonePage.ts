import { expect, Locator, Page } from "@playwright/test";

export class addNewZone {

    readonly page: Page;
    readonly btnAddZone: Locator;
    readonly txtZoneId: Locator;
    readonly txtZoneName: Locator;
    readonly txtSortOrder: Locator;
    readonly btnsaveZone:Locator;


    constructor(page: Page) {

        this.page = page;
        this.btnAddZone = page.getByRole('button', { name: 'Add Zone' });
        this.txtZoneId = page.getByPlaceholder('e.g. DRY',{ exact: true });
        this.txtZoneName = page.getByPlaceholder('e.g. Dry Goods',{ exact: true });
        this.txtSortOrder = page.getByPlaceholder('0');
        this.btnsaveZone = page.getByRole('button', { name: 'Create Zone' });
      
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
        await expect(this.page.getByRole('alert'))
            .toHaveText(/Zone [A-Za-z0-9_]+ created\./);
    }
}