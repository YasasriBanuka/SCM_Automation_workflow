import { expect, Locator, Page } from "@playwright/test";

export class changeRawMaterilaDetails {
    readonly page: Page;
    readonly btnSaveChanges: Locator;
    readonly drpUOM: Locator;
    readonly optPCS: Locator;
    readonly toastRawMaterialUpdated: Locator;
    readonly btndeactivate: Locator;
    readonly btnConfirmDeactivate: Locator;
    readonly deactivateSuccessMessage: Locator;
    readonly cannotDeactivationMessage: Locator;



    constructor(page: Page) {
        this.page = page;
        this.btnSaveChanges = page.getByRole('button', { name: 'Save Changes', exact: true });
        this.drpUOM = page.locator('button[aria-haspopup="listbox"]').filter({ hasText: 'KG' });
        this.optPCS = page.getByRole('option', { name: 'PCS', exact: true });
        this.toastRawMaterialUpdated = page.getByRole('alert').filter({ hasText: 'Raw material updated successfully.' });
        this.btndeactivate = page.getByRole('button', { name: 'Deactivate', exact: true });
        this.btnConfirmDeactivate = page.getByRole('button', { name: 'Deactivate', exact: true }).last();
        this.deactivateSuccessMessage = page.getByRole('alert').filter({ hasText: 'Raw material deactivated.' });
        this.cannotDeactivationMessage = page.getByRole('alert').filter({ hasText: 'Cannot delete — this raw material is used in 1 product recipe(s).' });
    }
    async verifySaveChangesDisabled() {
        await expect(this.btnSaveChanges).toBeDisabled();
        console.log('Save Changes button is disabled before changing data.');
    }

    async selectPCS() {
        await this.drpUOM.click();
        await this.optPCS.click();
    }

    async verifySaveChangesEnabled() {
        await expect(this.btnSaveChanges).toBeEnabled();
        console.log('Save Changes button is enabled after changing data.');
    }

    async clickSaveChanges() {
        await this.btnSaveChanges.click();
    }

    async verifyRawMaterialUpdatedToast() {
        await expect(this.toastRawMaterialUpdated).toBeVisible();

        await expect(this.toastRawMaterialUpdated).toHaveText(
            'Raw material updated successfully.'
        );

        console.log('Raw material updated successfully toast message is displayed.');
    }
    async clickDeactivateButton() {
        await this.btndeactivate.click();
    }
    async confirmDeactivate() {
        await this.btnConfirmDeactivate.click();
    }
    async verifyDeactivateSuccessMessage() {

        await expect(this.deactivateSuccessMessage).toBeVisible();

        const message = await this.deactivateSuccessMessage.textContent();

        console.log('Deactivate success message:', message);

        await expect(this.deactivateSuccessMessage).toHaveText(
            'Raw material deactivated.'
        );
    }

    async verifyCannotDeactivationMessage() {

        const expectedMessage =
            'Cannot delete — this raw material is used in 1 product recipe(s).';

        await expect(this.cannotDeactivationMessage).toBeVisible();

        const message = await this.cannotDeactivationMessage.textContent();

        console.log('Expected Message:', expectedMessage);
        console.log('Actual Message:', message);

        await expect(this.cannotDeactivationMessage).toContainText(expectedMessage);
    }
}

