import { expect, Locator, Page } from "@playwright/test";


export class addComplaints {

    readonly page: Page;
    readonly drpPartyType: Locator;
    readonly btnSelectCustomer: Locator;
    readonly txtSearchCustomer: Locator;
    //complaints details 
    readonly txtTitle: Locator;
    readonly txtDescrption: Locator;
    readonly drpCategory: Locator;
    readonly drpPriority: Locator;
    readonly optHNBHolding: Locator;
    //Related records
    readonly drpsalesOrder: Locator;
    readonly txtSearchSales:Locator;
    readonly optSalesOrder:Locator;
    readonly drpShipment: Locator;
    readonly txtSearchShipment:Locator;
    readonly optShipment :Locator;
    readonly btnLogComplaints: Locator;
    readonly toastSuccess:Locator;

    constructor(page: Page) {
        this.page = page;
        this.drpPartyType = page.locator('button[aria-haspopup="listbox"]').filter({ hasText: "Customer" });
        this.btnSelectCustomer = page.getByRole('button', { name: 'Select supplier…' });
        this.txtSearchCustomer = page.getByPlaceholder('Search suppliers...');
        this.optHNBHolding = page.getByRole('button', { name: /HNB Hlodings/ });
        this.txtTitle = page.getByPlaceholder('e.g. Pallet arrived with crushed cartons');
        this.txtDescrption = page.getByPlaceholder('Describe what happened...');
        this.drpCategory = page.getByRole('button', { name: 'Select category…' });
        this.drpPriority = page.locator('button[aria-haspopup="listbox"]').filter({ hasText: "Medium" });
        this.drpsalesOrder = page.getByRole('button', { name: 'Select sales order…' });
        this.txtSearchSales = page.getByPlaceholder('Search sales orders...');
        this.optSalesOrder = page.getByRole('button', { name: /SO-2026-0001/ });
        this.drpShipment = page.getByRole('button', { name: 'Select shipment…' });
        this.txtSearchShipment = page.getByPlaceholder('Search shipments...');
        this.optShipment = page.getByRole('button', { name: /SHP-2026-0001/ });
        this.btnLogComplaints = page.getByRole('button', { name: 'Log Complaint', exact: true });
        this.toastSuccess = page.locator('.Toastify__toast--success');

    }

    async addComplaints(
        partyType: string,
        title: string,
        description: string,
        priority:string

    ) {
        await this.drpPartyType.click();
        await this.page.getByText(partyType, { exact: true }).click();
        await this.btnSelectCustomer.click();
        await this.txtSearchCustomer.fill('HNB');
        await this.page.getByText('HNB Holdings', { exact: true });
        await this.optHNBHolding.waitFor({ state: 'visible' });
        await this.optHNBHolding.click();
        await this.txtTitle.fill(title);
        await this.txtDescrption.fill(description);

        await this.drpCategory.click();
        await this.page.getByRole('option', { name: 'Late Delivery' }).click();

        await this.drpPriority.click();
        await this.page.getByText(priority, { exact: true }).click();


        await this.drpsalesOrder.click();
        await this.txtSearchSales.fill('Q1');
        await this.page.getByText('SO-2026-0001', { exact: true });
        await this.optSalesOrder.waitFor({ state: 'visible' });
        await this.optSalesOrder.click();

        await this.drpShipment.click();
        await this.txtSearchShipment.fill('0001');
        await this.page.getByText('SHP-2026-0001', { exact: true });
        await this.optShipment.waitFor({ state: 'visible' });
        await this.optShipment.click();

        await this.btnLogComplaints.click();
        await expect(this.toastSuccess).toContainText('logged successfully.');
    }

    async createComplaintsLink(
        partyType: string,
        
    ) {
        await this.drpPartyType.click();
        await this.page.getByRole('option', { name: partyType, exact: true }).click();
        await this.btnSelectCustomer.click();

        await this.txtSearchCustomer.fill('HNB');
        await this.page.getByText('HNB Holdings', { exact: true });
        await this.optHNBHolding.waitFor({ state: 'visible' });
        await this.optHNBHolding.click();
    }
}