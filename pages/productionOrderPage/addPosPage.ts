import { expect, Locator, Page } from "@playwright/test";

export class addPosPage {
    readonly page: Page;
    readonly txtPoNo: Locator;
    readonly btnBom: Locator;
    readonly txtBom: Locator;
    readonly optBom: Locator;
    readonly txtQuantity: Locator;
    readonly btnUOM: Locator;
    readonly optPCS: Locator;
    readonly txtStartDate: Locator;
    readonly txtEndDate: Locator;
    readonly txtDescription: Locator;
    readonly btnCreateOrder: Locator;
    readonly toastSuccess: Locator;

    constructor(page: Page) {
        this.page = page;
        this.txtPoNo = page.getByPlaceholder('e.g. PO-2026-0001');

        this.btnBom = page.getByRole('button', { name: 'Search BOM…', exact: true });
        this.txtBom = page.getByPlaceholder('Search BOM number or finished product…');
        this.optBom = page.locator('button').filter({ has: page.getByText('BOM-2026-001', { exact: true }) });
        this.txtQuantity = page.locator('input[type="number"][min="0"]');

        this.btnUOM = page.getByRole('button', { name: 'Select UOM…', exact: true });
        this.optPCS = page.getByRole('option', { name: 'PCS', exact: true });
        this.txtStartDate = page.locator('input[type="date"]').nth(0);
        this.txtEndDate = page.locator('input[type="date"]').nth(1);
        this.txtDescription = page.getByPlaceholder('Optional', { exact: true });
        this.btnCreateOrder = page.getByRole('button', { name: 'Create Order' });
        this.toastSuccess = page.getByRole('alert');
    }

    async enterPoNo(
        poNo: string,
        qty: string,
        sDate: string,
        eDate: string,
        description: string
    ) {
        await this.txtPoNo.fill(poNo);

        await this.btnBom.click();
        await this.txtBom.fill('BOM-2026-001');
        await this.optBom.waitFor({ state: 'visible' });
        await this.optBom.click();
        await this.txtQuantity.fill(qty);

        await this.btnUOM.click();
        await this.optPCS.click();
        await this.txtStartDate.fill(sDate);
        await this.txtEndDate.fill(eDate);
        await this.txtDescription.fill(description);
        await this.btnCreateOrder.click();
        await expect(this.toastSuccess).toContainText(/Production order .+ created\./);
    }
}