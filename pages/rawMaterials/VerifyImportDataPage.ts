import { expect, Locator, Page } from "@playwright/test";

export class verifyImportData {
    readonly page: Page;
    readonly btnEditRow2: Locator;
    readonly txtDescription: Locator;
    readonly btnRevalidateRow: Locator;
    readonly toastRowValidMessage: Locator;
    readonly btnImportOneRow: Locator;
    readonly btnDone: Locator;
    readonly toastImportSuccessMessage: Locator;
    readonly toastImportSuccessCheckBoxMessage: Locator;
    readonly errorTable: Locator;
    readonly errorRow: Locator;
    readonly errorRowNumber: Locator;
    readonly errorMessage: Locator;


    constructor(page: Page) {
        this.page = page;

        this.btnEditRow2 = page.locator('button[aria-label="Edit row 2"]');
        this.txtDescription = page.getByText('Description', { exact: true }).locator('..').getByRole('textbox');
        this.btnRevalidateRow = page.getByRole('button', { name: 'Revalidate row', exact: true });
        this.toastRowValidMessage = page.getByRole('alert').filter({ hasText: 'Row 2 is now valid.' });
        this.btnImportOneRow = page.getByRole('button', { name: 'Import 1 Row' });
        this.toastImportSuccessMessage = page.getByRole('alert').filter({ hasText: 'Raw materials imported — 1 created.' });
        this.toastImportSuccessCheckBoxMessage = page.getByRole('alert').filter({ hasText: 'Raw materials imported — 1 updated.' });
        this.errorTable = page.locator('div.max-h-64 table');
        // Duplicate RM_010 error row
        this.errorRow = this.errorTable.locator('tbody tr').filter({ hasText: 'RM_010' });
        // Row number
        this.errorRowNumber = this.errorRow.locator('td').nth(0);
        // Error message
        this.errorMessage = this.errorRow.locator('td').nth(1);
        this.btnDone = page.getByRole('button', { name: 'Done', exact: true });
    }

    async clickEditRow2() {
        await this.btnEditRow2.click();
    }

    async enterDescription(description: string) {
        await this.txtDescription.fill(description);
    }

    async clickRevalidateRow() {
        await this.btnRevalidateRow.click();
    }
    async verifyRowValidMessage() {
        await expect(this.toastRowValidMessage).toBeVisible();
    }


    async clickImportOneRow() {
        await this.btnImportOneRow.click();
    }

    async verifySuccessImport() {
        await expect(
            this.toastImportSuccessMessage
        ).toBeVisible();
    }
    async verifyCheckBoxMessageImport() {
        await expect(
            this.toastImportSuccessCheckBoxMessage
        ).toBeVisible();
    }

    async verifyDuplicateRawMaterialError(): Promise<void> {

        await this.errorRow.waitFor({ state: 'visible' });
        await this.errorRowNumber.waitFor({ state: 'visible' });
        await this.errorMessage.waitFor({ state: 'visible' });

        const message = await this.errorMessage.textContent();

        // Print error message in console
        console.log('Error Message:', message);

        // Verify exact error message
        expect(message?.trim()).toBe(
            'Raw material "RM_010" already exists (enable "Update Existing" to update it)');

        console.log('Duplicate raw material error message is displayed successfully.');
    }

    async clickDone() {
        await this.btnDone.click();
    }
}