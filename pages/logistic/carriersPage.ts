import { expect, Locator, Page } from "@playwright/test";

export class carriersPage {

    readonly page: Page;
    readonly txtCarriersName: Locator;
    readonly txttrackingURL: Locator;
    readonly btnexpress: Locator;
    readonly btnZone: Locator;
    readonly txtSLA: Locator;
    readonly txtPerformance: Locator;
    readonly txtCostRating: Locator;
    readonly txtContactName: Locator;
    readonly txtPhone: Locator;
    readonly txtEmail: Locator;
    readonly txtNote: Locator;
    readonly btnSave: Locator;
    readonly rowCarrier: Locator;

    constructor(page: Page) {
        this.page = page;
        this.txtCarriersName = page.getByPlaceholder('ABC Express Lanka');
        this.txttrackingURL = page.getByPlaceholder('https://abc.com/track?id=');
        this.btnexpress = page.getByRole('button', { name: 'express', exact: true });
        this.btnZone = page.getByRole('button', { name: 'Southern Province', exact: true })
        this.txtSLA = page.getByPlaceholder('3').nth(0);
        this.txtPerformance = page.getByPlaceholder('87.5');
        this.txtCostRating = page.getByPlaceholder('3').nth(1);

        //contact Information
        this.txtContactName = page.getByPlaceholder('John Doe');
        this.txtPhone = page.getByPlaceholder('+94 11 234 5678');
        this.txtEmail = page.getByPlaceholder('kamal@dhl.lk');

        //Note 
        this.txtNote = page.getByPlaceholder('Any additional notes about this carrier…');
        this.btnSave = page.getByRole('button', { name: 'Save Carrier', exact: true });
        this.rowCarrier = page.locator('tbody tr').filter({ hasText: 'ABC Express Banuka Dias' });
    }

    // Carrier Information
    async enterCarriersDetails(
        carriersName: string,
        trackingURL: string,
        sla: string,
        performance: string,
        costRating: string
    ) {
        await this.txtCarriersName.fill(carriersName);
        await this.txttrackingURL.fill(trackingURL);
        await this.btnexpress.click();
        await this.btnZone.click();
        await this.txtSLA.fill(sla);
        await this.txtPerformance.fill(performance);
        await this.txtCostRating.fill(costRating);
    }
    // Contact Information
    async enterContacDetails(

        contactName: string,
        phone: string,
        email: string
    ) {
        await this.txtContactName.fill(contactName);
        await this.txtPhone.fill(phone);
        await this.txtEmail.fill(email);
    }

    // Notes
    async enterNote(note: string) {
        await this.txtNote.fill(note);
    }

    async clickSave() {
        await this.btnSave.click();
    }

    async verifyCarrierCreatedMessage() {
        await expect(
            this.page.locator('.Toastify__toast--success')
        ).toContainText(`Carrier created. Redirecting…`);

    }

    async clickCarriers() {
        const targetRow = this.page.locator('tbody tr').filter({
            hasText: 'ABC Express'
        });

        await expect(targetRow).toBeVisible();
        await targetRow.click();
    }

}