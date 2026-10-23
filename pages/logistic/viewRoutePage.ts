import { expect, Locator, Page } from "@playwright/test";

export class viewRoute {

    readonly page: Page;
    readonly txtNote: Locator;
    readonly fileUpload: Locator;
    readonly btnConfirm: Locator;
    readonly btnRouteOptimization: Locator;
    readonly btnStartRoute:Locator;
    readonly btnCompleteRoute : Locator;

    constructor(page: Page) {

        this.page = page;
        this.txtNote = page.getByPlaceholder('Package handed to reception…');
        this.fileUpload = page.locator('input[type="file"]');
        this.btnConfirm = page.getByRole('button', { name: 'Confirm', exact: true });
        this.btnRouteOptimization = page.getByRole('button',{name:'Optimize Route',exact:true});
        this.btnStartRoute = page.getByRole('button',{name:'Start Route',exact:true});
        this.btnCompleteRoute = page.getByRole('button',{name:'Complete Route',exact:true});
    }
    async addDeliveredNote(
        note: string,

    ) {
        await this.txtNote.fill(note);
        await this.fileUpload.setInputFiles('uploads\\Delivery_Proofment.png');
        await this.btnConfirm.click();
        await expect(this.page.locator('.Toastify__toast--success')).toContainText('Stop status updated.');
    }
    async routeOptimization(){
        await this.btnRouteOptimization.click();
        await expect(this.page.locator('.Toastify__toast--success')).toContainText('Route optimized successfully.');
    }
    async startRoute(){
        await this.btnStartRoute.click();
        await expect(this.page.locator('.Toastify__toast--success')).toContainText('Route marked as in progress.');
    }
    async completedRoute(){
        await this.btnCompleteRoute.click();
         await expect(this.page.locator('.Toastify__toast--success')).toContainText('Route marked as completed.');
    }
}