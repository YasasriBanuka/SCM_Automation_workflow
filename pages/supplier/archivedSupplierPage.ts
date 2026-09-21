import { Locator, Page } from '@playwright/test';

export class archivedSupplierPage {
    readonly page: Page;
    readonly lblSupplier: Locator;
    readonly lblApprovals: Locator;
    readonly btnRecentlyActioned: Locator;
    readonly btnViewMore: Locator;

    constructor(page: Page) {
        this.page = page;
        this.lblSupplier = page.getByRole('button', { name: 'Suppliers' });
        this.lblApprovals = page.getByRole('link', { name: 'Approvals' });
        this.btnRecentlyActioned = page.getByText('Recently Actioned', { exact: true, });
        this.btnViewMore = page.getByRole('button', { name: 'View More' }).nth(1);
    }

    async clickLblSupplier() {
        await this.lblSupplier.click();
    }

    async clickLblApprovals() {
        await this.lblApprovals.click();
    }

    async navigateToRecentlyActioned() {
        await this.btnRecentlyActioned.click();
    }

    async viewSupplierDetails() {
        await this.btnViewMore.click();
    
    }
}