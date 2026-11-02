import { expect, Locator, Page } from "@playwright/test";

export class viewShipment {

    readonly page: Page;
    readonly btnUpdateStatus: Locator;
    readonly ddlShipmentStatus: Locator;
    readonly txtlocationHub: Locator;
    readonly txtNote: Locator;
    readonly btnUpdateStataus: Locator;

    constructor(page: Page) {
        this.page = page;
        this.btnUpdateStatus = page.getByRole('button', { name: 'Update Status', exact: true });
        this.ddlShipmentStatus = page.locator('select').filter({has: page.locator('option[value="packed"]')});
        this.txtlocationHub = page.getByPlaceholder('Colombo Hub');
        this.txtNote = page.locator('textarea');
        this.btnUpdateStataus = page.getByRole('button', { name:'Update Status', exact: true }).nth(1);
    }  
    async updateShipmentStatus(
        locationHub: string,
        note: string
    ) {
        await this.btnUpdateStatus.click();
        await this.ddlShipmentStatus.selectOption('packed');
        await this.txtlocationHub.fill(locationHub);
        await this.txtNote.fill(note);  
        await this.btnUpdateStataus.click();
    }
}