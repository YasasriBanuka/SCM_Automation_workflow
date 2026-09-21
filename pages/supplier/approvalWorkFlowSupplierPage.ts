import { Locator, Page } from '@playwright/test';

export class approvalWorkFlowSupplierPage {

    readonly page: Page;
    readonly lblSupplier: Locator;
    readonly lblDirectory: Locator;
    readonly btnAddSupplier: Locator;
    readonly btnMoreeOption: Locator;
    readonly btnViewMore: Locator;
    readonly btnRowActionsBOIHolding: Locator;
    readonly btnSubmitForApproval: Locator;
    readonly txtComment: Locator;
    readonly btnSubmit: Locator;
    readonly btnCancel: Locator;
    readonly btnApprove: Locator;
    readonly btnReject: Locator;

    constructor(page: Page) {
        this.page = page;
        this.lblSupplier = page.getByText('Suppliers', { exact: true });
        this.lblDirectory = page.getByRole('link', { name: 'Directory', exact: true });
        this.btnAddSupplier = page.getByRole('button', { name: 'Add Supplier', exact: true });
        this.btnMoreeOption = page.getByRole('button', { name: 'Row actions' }).first();
        this.btnViewMore = page.getByRole('button', { name: 'View More' });

        // Draft to Pending Approval flow
        this.btnRowActionsBOIHolding = page
            .locator('tr.transition-colors.cursor-pointer')
            .filter({ hasText: 'BOI Holding' })
            .getByRole('button', { name: 'Row actions' });
        this.btnSubmitForApproval = page.getByRole('button', { name: 'Submit for Approval' });
        this.txtComment = page.locator('#status-comment');
        this.btnSubmit = page.getByRole('button', { name: 'Submit', exact: true });
        this.btnCancel = page.getByRole('button', { name: 'Cancel' });
        this.btnApprove = page.getByRole('button', { name: 'Approve' });
        this.btnReject = page.getByRole('button', { name: 'Reject' });
    }

    async clickLblSupplier() {
        await this.lblSupplier.click();
    }

    async ClicklblDirectory() {
        await this.lblDirectory.click();
    }

    async clickbtnMore() {
        await this.btnMoreeOption.click();
    }

    async clickbtnViewMore() {
        await this.btnViewMore.click();
    }

    async clickRowActionsMasHolding() {
        await this.btnRowActionsBOIHolding.click();
    }

    async clickSubmitForApproval() {
        await this.btnSubmitForApproval.click();
    }

    async enterComment(comment: string) {
        await this.txtComment.fill(comment);
    }

    async clickSubmit() {
        await this.btnSubmit.click();
    }

    async clickCancel() {
        await this.btnCancel.click();
    }

    async isApproveButtonVisible(): Promise<boolean> {
        return await this.btnApprove.isVisible();
    }

    async isRejectButtonVisible(): Promise<boolean> {
        return await this.btnReject.isVisible();
        
    }
}