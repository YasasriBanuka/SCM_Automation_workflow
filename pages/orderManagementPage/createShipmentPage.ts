
import { expect, Locator, Page } from "@playwright/test";

export class addShipmentPage {

    readonly page: Page;
    readonly btnSearchReleasedOrder: Locator;
    readonly txtorder: Locator;
    readonly optionSalesOrder: Locator;
    readonly btnCarrier: Locator;
    readonly optionABCExpress: Locator;
    readonly serviceType: Locator;
    readonly TrackNo: Locator;
    readonly txtShipmentDate: Locator;
    readonly txtShipmentQuantity: Locator;
    readonly btnAddPallet: Locator;
    readonly txtShipmentWeight: Locator;
    readonly txtLength: Locator;
    readonly txtWidth: Locator;
    readonly txtHeight: Locator;
    readonly txtDescription: Locator;
    readonly btnAddBoxToPallet: Locator;
    readonly txtBoxQuantity: Locator;
    readonly txtLength2: Locator;
    readonly txtWidth2: Locator;
    readonly txtHeight2: Locator;
    readonly txtDescription2: Locator;
    readonly itemQuantity: Locator;
    readonly txtNote: Locator;
    readonly btnSubmitShipment: Locator;
    readonly toastSuccess: Locator;


    constructor(page: Page) {
        this.page = page;

        this.btnSearchReleasedOrder = page.getByRole('button', { name: /Search released sales orders by number or customer/ });
        this.txtorder = page.locator('input[placeholder="Search released sales orders by number or customer…"]:visible');
        this.optionSalesOrder = page.locator('button')
            .filter({ hasText: 'SO-2026-0006' })
            .filter({ hasText: 'MacTiles Holdings' });
        this.btnCarrier = page.getByRole('button', { name: 'Select carrier…', exact: true });
        this.optionABCExpress = page.getByRole('option', { name: 'ABC Express (CAR-0001)', exact: true });
        this.serviceType = page.getByPlaceholder('Express');
        this.TrackNo = page.getByPlaceholder('1Z999AA10123456784');
        this.txtShipmentDate = page.locator('input[type="date"]');
        this.txtShipmentQuantity = page.getByPlaceholder('45.00', { exact: true });

        this.btnAddPallet = page.getByRole('button', { name: 'Add Pallet', exact: true });
        this.txtShipmentWeight = page.locator('input[type="number"]').nth(1);
        this.txtLength = page.getByPlaceholder('L', { exact: true });
        this.txtWidth = page.getByPlaceholder('W', { exact: true });
        this.txtHeight = page.getByPlaceholder('H', { exact: true });
        this.txtDescription = page.getByRole('textbox').nth(5);

        this.btnAddBoxToPallet = page.getByRole('button', { name: 'Add Box to Pallet', exact: true });
        this.txtBoxQuantity = page.locator('input[type="number"]').nth(5);
        this.txtLength2 = page.getByPlaceholder('L', { exact: true }).nth(1);
        this.txtWidth2 = page.getByPlaceholder('W', { exact: true }).nth(1);
        this.txtHeight2 = page.getByPlaceholder('H', { exact: true }).nth(1);
        this.txtDescription2 = page.getByRole('textbox').nth(7);
        this.itemQuantity = page.locator('input[type="number"][max="40"]');
        this.txtNote = page.getByPlaceholder('Leave at security desk');
        this.btnSubmitShipment = page.getByRole('button', { name: 'Create Shipment', exact: true });
        this.toastSuccess = page.locator('.Toastify__toast--success');
    }
    async clickSearchReleasedOrder(

        serviceType: string,
        TrackNo: string,
        txtShipmentDate: string,
        txtShipmentQuantity: string,
        txtShipmentWeight: string,
        txtLength: string,
        txtWidth: string,
        txtHeight: string,
        txtDescription: string,
        qty: string,
        txtLength2: string,
        txtWidth2: string,
        txtHeight2: string,
        txtDescription2: string,
        itemQuantity: string,
        txtNote: string

    ) {
        await this.btnSearchReleasedOrder.click();
        await this.txtorder.fill('SO-2026-0006');
        await this.optionSalesOrder.click();
        await this.btnCarrier.click();
        await this.optionABCExpress.click();
        await this.serviceType.fill(serviceType);
        await this.TrackNo.fill(TrackNo);
        await this.txtShipmentDate.fill(txtShipmentDate);
        await this.txtShipmentQuantity.fill(txtShipmentQuantity);
        await this.btnAddPallet.click();
        await this.txtShipmentWeight.fill(txtShipmentWeight);
        await this.txtLength.fill(txtLength);
        await this.txtWidth.fill(txtWidth);
        await this.txtHeight.fill(txtHeight);
        await this.txtDescription.fill(txtDescription);
        await this.btnAddBoxToPallet.click();
        await this.txtBoxQuantity.fill(qty);
        await this.txtLength2.fill(txtLength2);
        await this.txtWidth2.fill(txtWidth2);
        await this.txtHeight2.fill(txtHeight2);
        await this.txtDescription2.fill(txtDescription2);
        await this.itemQuantity.fill(itemQuantity);
        await this.txtNote.fill(txtNote);
        await this.btnSubmitShipment.click();
        await expect(this.toastSuccess).toContainText('Shipment created successfully.Redirection…');

    }
}
