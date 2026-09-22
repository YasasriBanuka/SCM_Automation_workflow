import { expect, Locator, Page } from "@playwright/test";

export class AddRawMaterialData {

    readonly page: Page;
    readonly txtItemCode: Locator;
    readonly drpUOM: Locator;
    readonly txtDescription: Locator;
    readonly txtPurchaseLeadTime: Locator;
    readonly txtQCLeadTime: Locator;
    readonly btnaddMaterial: Locator;
    readonly toastSuccessMessage: Locator;
    readonly txtItemCodeError: Locator;
    readonly txtDessError: Locator;
    readonly toastErrorMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.txtItemCode = page.getByPlaceholder("RAW-MATERIAL-01");
        this.drpUOM = page.getByRole("button", { name: "KG" });
        this.txtDescription = page.getByPlaceholder("Raw material name");
        this.txtPurchaseLeadTime = page.getByRole("spinbutton", { name: "7" });
        this.txtQCLeadTime = page.getByRole("spinbutton", { name: "2" });
        this.btnaddMaterial = page.getByRole('button', { name: 'Create Raw Material', exact: true });
        this.toastSuccessMessage = page.getByRole('alert').filter({ hasText: 'Raw material created successfully.' })
        this.txtItemCodeError = page.getByRole("alert").filter({ hasText: "Item code is required." });
        this.txtDessError = page.getByRole("alert").filter({ hasText: "Description is required." });
        // Duplicate data error message validation 
        this.toastErrorMessage = page.getByRole('alert').filter({ hasText: 'Failed to create raw material.' });
    }

    async enterItemCode(

        itemCode: string
    ) {
        await this.txtItemCode.fill(itemCode);
    }

    async selectUOM(

        uom: string
    ) {
        await this.drpUOM.click();
        await this.page.getByRole('option', { name: uom, exact: true }).click();
    }

    async enterDescription(

        description: string
    ) {
        await this.txtDescription.fill(description);
    }

    async enterPurchaseLeadTime(

        leadTime: string
    ) {
        await this.txtPurchaseLeadTime.fill(leadTime);
    }

    async enterQCLeadTime(

        leadTime: string
    ) {
        await this.txtQCLeadTime.fill(leadTime);
    }
    async clickAddMaterial() {
        await this.btnaddMaterial.click();
    }

    async verifyRawMaterial() {
        await expect(this.toastSuccessMessage).toBeVisible();
    }

    async verifyItemCodeRequiredError() {
        await expect(this.txtItemCodeError).toBeVisible();
        await expect(this.txtItemCodeError).toHaveText("Item code is required.");
    }
    async verifyDescriptionRequiredError() {
        await expect(this.txtDessError).toBeVisible();
        await expect(this.txtDessError).toHaveText("Description is required..");
    }
    async verifyRawMaterialCreationFailed() {
        await expect(this.toastErrorMessage).toBeVisible();
    }
}