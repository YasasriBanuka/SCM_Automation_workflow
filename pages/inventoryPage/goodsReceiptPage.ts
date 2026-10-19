import { expect, Locator, Page } from "@playwright/test";

export class goodsReceiptPage {

    readonly page: Page;
    readonly ddlPO: Locator;
    readonly btnSelectWarehouse: Locator;
    readonly txtQuantity: Locator;
    readonly txtBatch: Locator;
    readonly txtExpiryDate: Locator;
    readonly btnPostReceipt: Locator;
    readonly toastMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ddlPO = page.locator('select').filter({ has: page.locator('option[value="09b5f5f5-31e4-4f5f-9dd2-3ba3e0d05c50"]') });
        this.btnSelectWarehouse = page.locator('select').filter({ has: page.locator('option[value="de22e181-134c-41aa-9446-169866d22c47"]') });
        this.txtQuantity = page.locator('input[type="number"]').first();
        this.txtBatch = page.getByPlaceholder('Batch # (optional)');
        this.txtExpiryDate = page.locator('input[type="date"]');
        this.btnPostReceipt = page.getByRole('button', { name: 'Post Receipt',   exact: true});
        this.toastMessage = page.getByRole('alert');
    }
    async selectPO() {
        await this.ddlPO.selectOption('09b5f5f5-31e4-4f5f-9dd2-3ba3e0d05c50');
    }

    async selectWH() {
        await this.btnSelectWarehouse.selectOption('de22e181-134c-41aa-9446-169866d22c47');
    }

    async enterData(
        quantity: string,
        batch: string,
        expiryDate: string
    ) {
        await this.txtQuantity.fill(quantity);
        await this.txtBatch.fill(batch);
        await this.txtExpiryDate.fill(expiryDate);
        await this.btnPostReceipt.click();
    }

    async verifyToastMessage() {
        await expect(this.toastMessage).toHaveText(/1 line received against PO-\d{4}-\d{4}\./ );
    }

}


