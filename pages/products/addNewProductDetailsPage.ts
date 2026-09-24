import { expect, Locator, Page } from "@playwright/test";

export class addNewProduct {
    readonly page: Page;
    readonly itemCodeInput: Locator;
    readonly uomDropdown: Locator;
    readonly productNameInput: Locator;
    readonly categoryInput: Locator;

    // Raw Materials
    readonly addMaterialButton1: Locator;
    readonly componentItemDropdown: Locator;
    readonly quantityInput: Locator;
    readonly scrapInput: Locator;
    readonly notesInput: Locator;
    readonly addMaterialButton: Locator;

    // Barcodes
    readonly addBarcodeButton1: Locator;
    readonly barcodeValueInput: Locator;
    readonly barcodeTypeDropdown: Locator;
    readonly addBarcodeButton: Locator;

    readonly saveProductButton: Locator;

    readonly verifyAddMessage: Locator;


    constructor(page: Page) {
        this.page = page;
        // Product Information
        this.itemCodeInput = page.getByPlaceholder('PKG-BOX-L');
        this.uomDropdown = page.getByRole('button', { name: 'Select UOM…', exact: true });
        this.productNameInput = page.getByPlaceholder('Large Corrugated Box 40x30x25cm');
        this.categoryInput = page.getByPlaceholder('e.g. Packaging, Electronics');

        // Raw Materials
        this.addMaterialButton1 = page.getByRole('button', { name: 'Add Material', exact: true });
        this.componentItemDropdown = page.getByRole('button', { name: 'Search raw material items…', exact: true });
        this.quantityInput = page.getByPlaceholder('1');
        this.scrapInput = page.getByText('Scrap %', { exact: true }).locator('..').getByRole('spinbutton');;
        this.notesInput = page.getByPlaceholder('Optional notes…');
        this.addMaterialButton = page.getByRole('button', { name: 'Add Material', exact: true });

        // Bar Code 
        this.addBarcodeButton1 = page.getByRole('button', { name: 'Add Barcode', exact: true });
        this.barcodeValueInput = page.getByPlaceholder('8712345678901');
        this.barcodeTypeDropdown = this.page.getByRole('button', { name: 'EAN13', exact: true });
        this.addBarcodeButton = page.getByRole('button', { name: 'Add Barcode', exact: true });

        //Click save product button
        this.saveProductButton = page.getByRole('button', { name: 'Save Product', exact: true });

        //Verify add product message 
        this.verifyAddMessage = page.getByRole('alert').filter({ hasText: 'Product saved. It will appear in the list shortly.' })
    }
    //Add New Product action method
    async enterProductInformation(
        itemCode: string,
        productName: string,
        category: string
    ) {
        await this.itemCodeInput.fill(itemCode);
        await this.productNameInput.fill(productName);
        await this.categoryInput.fill(category);
    }
    async selectUOM(uom: string) {
        await this.uomDropdown.click();
        await this.page.getByText(uom, { exact: true }).click();
    }
    async selectComponentItem(item: string) {
        await this.componentItemDropdown.click();
        await this.page.getByText(item, { exact: true }).click();
    }

    // Raw Material Action method section 

    async addProduct1() {
        await this.addMaterialButton1.click();
    }
    async enterRawMaterialDetails(
        quantity: string,
        scrap: string,
        notes: string
    ) {
        await this.quantityInput.fill(quantity);
        await this.scrapInput.fill(scrap);
        await this.notesInput.fill(notes);
    }
    async addMaterial() {
        await this.addMaterialButton.click();
    }
    async clickAddBarcode() {
        await this.addBarcodeButton1.click();
    }
    async enterBarcode(barcode: string) {
        await this.barcodeValueInput.fill(barcode);
    }

    async selectBarcodeType(type: string) {
        await this.barcodeTypeDropdown.click();
        await this.page.getByText(type, { exact: true }).click();
    }

    //Action method for save product button
    async clickSaveProduct() {
        await this.page.getByRole('button', { name: 'Save Product', exact: true }).click();
    }

    async verifyAddProductSuccessMessage() {
            await expect(this.verifyAddMessage).toBeVisible();
            await expect(this.verifyAddMessage).toHaveText("Product saved. It will appear in the list shortly.");
        }
}