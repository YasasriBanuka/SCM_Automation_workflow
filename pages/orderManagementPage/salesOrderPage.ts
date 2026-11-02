
import { Locator, Page } from "@playwright/test";

export class addSalesOrder {

    readonly page: Page;
    readonly btnSelectCustomer: Locator;
    readonly txtCustomer: Locator;
    readonly optCustomer: Locator;
    readonly txtOrdTitle: Locator;
    readonly btnCusPO: Locator;
    readonly txtCusPo: Locator;
    readonly optCusPo: Locator;
    readonly txtDate: Locator;
    readonly txtAmount: Locator;
    readonly txtShippingChargeNote: Locator;
    readonly internalNote: Locator;
    readonly chkShippingAddress: Locator;

    readonly btnAddItem: Locator;
    readonly btnLineItem: Locator;
    readonly txtLineItem: Locator;
    readonly optLineItem: Locator;
    readonly txtQuantity: Locator;
    readonly txtUnitPrice: Locator;
    readonly txtDiscount: Locator;
    readonly txtTax: Locator;
    readonly deliveryDate: Locator;
    readonly btnSave:Locator;

    constructor(page: Page) {

        this.page = page;

        this.btnSelectCustomer = page.getByRole('button', { name: 'Select Customer', exact: true });
        this.txtCustomer = page.getByPlaceholder('Type customer name, ID, or currency…');
        this.optCustomer = page.getByRole('button', { name: /MacTiles Holdings/ });

        this.txtOrdTitle = page.getByPlaceholder('Q2 Supply Order — Lanka Retail');
        
        this.btnCusPO = page.getByRole('button', { name: 'Select a customer PO reference', exact: true });
        this.txtCusPo = page.getByPlaceholder('Search purchase orders…');
        this.optCusPo = page.getByRole('button', { name: /PO-2026-0003/ });

        // Order Date
        this.txtDate = page.locator('input[type="date"]:visible').first();
        this.txtAmount = page.getByPlaceholder('0.00');
        this.txtShippingChargeNote = page.getByPlaceholder('DHL Express — flat rate');
        this.internalNote = page.getByPlaceholder('Priority shipment — confirm by Friday');
        this.chkShippingAddress = page.getByLabel('Use customer default shipping address');
        this.btnAddItem = page.getByRole('button', { name: 'Add Line Item', exact: true });
        this.btnLineItem = page.getByRole('button', { name: 'Search item…', exact: true });
        this.txtLineItem = page.getByPlaceholder('Search item…');
        this.optLineItem = page.getByRole('button', { name: 'EL_001[BLENDER]' });
        this.txtQuantity = page.getByPlaceholder('1').nth(1);
        this.txtUnitPrice = page.getByPlaceholder('0.00').nth(2);
        this.txtDiscount = page.locator('input[placeholder="0"]:visible').nth(0);
        this.txtTax = page.locator('input[placeholder="0"]:visible').nth(1);

        // Delivery Date - Last visible date input
        this.deliveryDate = page.locator('input[type="date"]:visible').last();
        this.btnSave = page.getByRole('button',{name:'Save as Draft',exact:true});
    }

    async addOrder(
        title: string,
        date: string,
        shipAmount: string,
        shipChargeNote: string,
        internalNote: string,
        qty: string,
        diiscount: string,
        tax: string,
        dDate: string
    ) {
        await this.btnSelectCustomer.click();
        await this.txtCustomer.fill('Mac');
        await this.optCustomer.waitFor({ state: 'visible' });
        await this.optCustomer.click();
        await this.txtOrdTitle.fill(title);
        await this.btnCusPO.click();
        await this.txtCusPo.fill('003');
        await this.optCusPo.waitFor({ state: 'visible' });
        await this.optCusPo.click();
        await this.txtDate.fill(date);
        await this.txtAmount.fill(shipAmount);
        await this.txtShippingChargeNote.fill(shipChargeNote);
        await this.internalNote.fill(internalNote);
        await this.chkShippingAddress.check();
        await this.btnAddItem.click();
        await this.btnLineItem.click();
        await this.txtLineItem.fill('EL');
        await this.optLineItem.waitFor({ state: 'visible' });
        await this.optLineItem.click();
        await this.txtQuantity.fill(qty);
        await this.txtDiscount.fill(diiscount);
        await this.txtTax.fill(tax);
        await this.deliveryDate.fill(dDate);
        await this.btnSave.click();
    }
}
