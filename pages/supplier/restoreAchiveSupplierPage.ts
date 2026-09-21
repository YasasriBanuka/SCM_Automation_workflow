import { Page, Locator, expect } from '@playwright/test';

export class restoreArchiveSupplies {
    // Achive to Restore Locator Declarations
    readonly page: Page;
    readonly lblSupplier: Locator;
    readonly lblDirectory: Locator;
    readonly lblAchive: Locator;
    readonly btnRestore: Locator;
    readonly toastSupplierRestored: Locator;
    readonly toastSCMRestored: Locator;


    constructor(page: Page) {
         // Constructor - Initialize Locators [Achive to Restore]
        this.page = page;
        this.lblSupplier = page.getByText('Suppliers', { exact: true });
        this.lblDirectory = page.getByRole('link', { name: 'Directory', exact: true });
        this.lblAchive = page.getByRole('link', { name: 'Archived', exact: true });
        this.btnRestore = page.getByRole('button', { name: 'Restore' }).nth(0);
        this.toastSupplierRestored = page.getByRole('alert').filter({
            hasText: 'Supplier restored to Draft successfully.'
        });

        this.toastSCMRestored = page.getByRole('alert').filter({
            hasText: 'BOI Holding has been restored to Draft.'
        });
    }
    // create action methods 
    async clickLblSupplier() {
        await this.lblSupplier.click();
    }

    async clicklblDirectory() {
        await this.lblDirectory.click();
    }
    async clicklblAchive() {
        await this.lblAchive.click();
    }
    async clickRestore() {
        await this.btnRestore.click();
    }
    async verifySupplierRestoredMessage() {
        await expect(this.toastSupplierRestored)
            .toContainText('Supplier restored to Draft successfully.');
    }

    async verifySCMRestoredMessage() {
        await expect(this.toastSCMRestored)
            .toContainText('BOI Holding has been restored to Draft.');
    }
}