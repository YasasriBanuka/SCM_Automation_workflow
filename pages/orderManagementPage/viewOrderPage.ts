import { expect, Locator, Page } from "@playwright/test";

export class viewOrderPage {

    readonly page: Page;
    readonly btnpendingApproveOrder: Locator;
    readonly txtNote: Locator;
    readonly btnSubmit: Locator;
    readonly toastSuccess:Locator;
    readonly btnApproveOrder: Locator;
    readonly txtAddNote: Locator;
    readonly btnApprove: Locator;
    readonly btnReleaseOrder: Locator;
    readonly txtAddNoteRelease: Locator;
    readonly btnRelease: Locator;

    constructor(page: Page) {
        this.page = page;

        this.btnpendingApproveOrder = page.getByRole('button', { name: 'Submit for Approval', exact: true });
        this.txtNote = page.getByPlaceholder('Add a comment…');
        this.btnSubmit = page.getByRole('button', { name: 'Submit', exact: true });
        this.toastSuccess = page.locator('.Toastify__toast--success');

        this.btnApproveOrder = page.getByRole('button', { name: 'Approve', exact: true });
        this.txtAddNote = page.getByPlaceholder('Add a comment…').nth(1);
        this.btnApprove = page.getByRole('button', { name: 'Approve', exact: true }).last();

        this.btnReleaseOrder = page.getByRole('button', { name: 'Release to Fulfillment', exact: true });
        this.txtAddNoteRelease = page.getByPlaceholder('Add a comment…');
        this.btnRelease = page.getByRole('button', { name: 'Release', exact: true });
        
    }

    async pendingapproveOrder(

        pAapprovalNote: string,

    ) {
        await this.btnpendingApproveOrder.click();
        await this.txtNote.fill(pAapprovalNote);
        await this.btnSubmit.click();
        await expect(this.toastSuccess).toHaveText('Status updated successfully.');  
    }

    async approveOrder(

        approvalNote: string,
    ) {
        await this.btnApproveOrder.click();
        await this.txtNote.fill(approvalNote);
        await this.btnApprove.click();
        await expect(this.toastSuccess).toHaveText('Status updated successfully.');  
    }

    async releaseOrder(
        releaseNote: string,
    ) {
        await this.btnReleaseOrder.click();
        await this.txtAddNoteRelease.fill(releaseNote);
        await this.btnRelease.click();
        await expect(this.toastSuccess).toHaveText('Status updated successfully.');  
    }

}