import { expect, Locator, Page } from "@playwright/test";

export class addFeeltVehical {

    readonly page: Page;
    readonly txtRegistrationNumber: Locator;
    readonly btnVehicleType: Locator;
    readonly btnFuelType: Locator;
    readonly txtMake: Locator;
    readonly txtModel: Locator;
    readonly txtYear: Locator;
    readonly btnCarrier: Locator;

    // Capacity
    readonly txtMaxWeight: Locator;
    readonly txtMaxVolume: Locator;
    readonly txtMaxPallets: Locator;

    // Notes
    readonly txtNotes: Locator;
    readonly btnSave: Locator;

    readonly txtUpdateMake: Locator;
    readonly btnsaveChanges: Locator;
    readonly btnchangeStatus: Locator;
    readonly ddlVehicleStatus: Locator;
    readonly btnUpdate:Locator;

    constructor(page: Page) {

        this.page = page;
        this.txtRegistrationNumber = page.getByPlaceholder("CAB-1234");
        this.btnVehicleType = page.getByRole('button', { name: 'Select type…', exact: true });
        this.btnFuelType = page.getByRole('button', { name: 'Select fuel…', exact: true });
        this.txtMake = page.getByPlaceholder("ISUZU");
        this.txtModel = page.getByPlaceholder("NPR 75");
        this.txtYear = page.getByPlaceholder("2022");
        this.btnCarrier = page.getByRole('button', { name: 'No carrier (company-owned)', exact: true });

        // Capacity
        this.txtMaxWeight = page.getByPlaceholder("5000");
        this.txtMaxVolume = this.page.locator('input[type="number"][placeholder="18.5"]');
        this.txtMaxPallets = this.page.locator('input[type="number"][placeholder="12"]');
        // Notes
        this.txtNotes = page.getByPlaceholder("Internal notes about this vehicle…");
        this.btnSave = page.getByRole('button', { name: 'Register Vehicle', exact: true });

        //update workflow
        this.txtUpdateMake = this.page.locator('input[value="ISUZU"]');

        this.btnsaveChanges = page.getByRole('button', { name: 'Save Changes', exact: true });
        this.btnchangeStatus = page.getByRole('button', { name: 'Update Status', exact: true });
        this.ddlVehicleStatus = this.page.getByRole('combobox').nth(3);
        this.btnUpdate = page.getByRole('button',{name:'Update', exact:true}).last();
    }
    async enterFleetVehicalRegistrationData(
        registrationNumber: string,
        make: string,
        year: string,
        weight: string,
        volume: string,
        pallets: string,
        notes: string
    ) {
        await this.txtRegistrationNumber.fill(registrationNumber);
        await this.btnVehicleType.click();
        await this.page.getByRole('option', { name: 'container', exact: true }).click();
        await this.btnFuelType.click();
        await this.page.getByRole('option', { name: 'diesel', exact: true }).click();
        await this.txtMake.fill(make);
        await this.txtYear.fill(year);
        await this.btnCarrier.click();
        await this.page.getByRole('option', { name: 'ABC Express', exact: true }).click();
        await this.txtMaxWeight.fill(weight);
        await this.txtMaxVolume.fill(volume);
        await this.txtMaxPallets.fill(pallets);
        await this.txtNotes.fill(notes);
        await this.btnSave.click();

        await expect(this.page.locator('.Toastify__toast--success')
        ).toContainText('Vehicle registered successfully. Redirecting…');
    }

    async updateFleetVehicle(
        make: string,
    ) {
        await this.txtUpdateMake.fill(make);
        await this.btnsaveChanges.click();
        await expect(
            this.page.getByText('Vehicle updated successfully.', { exact: true })).toBeVisible();
    }
    async changeStatus(status: string) {

        await this.btnchangeStatus.click();
        await this.ddlVehicleStatus.selectOption(status);
        await this.btnUpdate.click();
        await expect(this.page.getByText('Vehicle status updated.', { exact: true })).toBeVisible();
    }
}

