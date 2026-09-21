import { Locator, Page } from '@playwright/test';

export class supplierApprovePage {

    readonly page: Page;
    readonly lblSupplier: Locator;
    readonly lblApprovals: Locator;
    readonly btnApproveBOIHolding: Locator;
    readonly txtApproveComment: Locator;
    readonly btnApproveConfirm: Locator;

    constructor(page: Page) {
        this.page = page;
        this.lblSupplier = page.getByRole('button', { name: 'Suppliers' });
        this.lblApprovals = page.getByRole('link', { name: 'Approvals' });
        // Approve button scoped to the MAS Holding row in the Pending Review table
        // tr.transition-colors.cursor-pointer observed in Step 11 browsing history
        this.btnApproveBOIHolding = page
            .locator('tr.transition-colors.cursor-pointer')
            .filter({ hasText: 'BOI Holding' })
            .getByRole('button', { name: 'Approve' });
        // Comment textarea inside the Approve Supplier dialog
        // placeholder observed in Step 13 browsing history
        this.txtApproveComment = page.getByRole('textbox', {
            name: 'Optional — e.g. All documents verified.',
        });
        // Approve confirm button inside the dialog
        // div.space-y-4 observed in Step 14 browsing history
        this.btnApproveConfirm = page.locator('div.space-y-4').getByRole('button', { name: 'Approve' });
    }

    async clickLblSupplier() {
        await this.lblSupplier.click();
    }
    async clickLblApprovals() {
        await this.lblApprovals.click();
    }
    async clickApproveBOIHolding() {
        await this.btnApproveBOIHolding.click();
    }
    async enterApproveComment(comment: string) {
        await this.txtApproveComment.fill(comment);
    }
    async clickApproveConfirm() {
        await this.btnApproveConfirm.click();
    }
}
