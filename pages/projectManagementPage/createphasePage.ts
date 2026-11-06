
import { expect, Locator, Page } from "@playwright/test";

export class addNewPhase {

    readonly page: Page;
    readonly btnAddPhase: Locator;
    readonly phaseInput: Locator;
    readonly phaseNumberInput: Locator;
    readonly phaseStatusDropdown: Locator;
    readonly txtPStart: Locator;
    readonly txtPEnd: Locator;
    readonly txtAStart: Locator;
    readonly txtAEnd: Locator;
    readonly btnSaveAddPhase: Locator;
    readonly successToast: Locator;
    readonly editPhaseButton: (phaseName: string) => Locator;
    readonly btnSave: Locator;

    constructor(page: Page) {
        this.page = page;

        this.btnAddPhase = page.getByRole('button', { name: 'Add Phase', exact: true });
        this.phaseInput = page.locator('input[required]');
        this.phaseNumberInput = page.locator('input[type="number"][value="1"]');
        this.phaseStatusDropdown = page.locator('button[aria-haspopup="listbox"]').filter({ hasText: 'Not Started' });
        this.txtPStart = page.locator('input[type="date"]').nth(0);
        this.txtPEnd = page.locator('input[type="date"]').nth(1);
        this.txtAStart = page.locator('input[type="date"]').nth(2);
        this.txtAEnd = page.locator('input[type="date"]').nth(3);
        this.btnSaveAddPhase = page.getByRole('button', { name: 'Add Phase', exact: true }).last();
        this.successToast = page.locator('.Toastify__toast--success');

        // Edit Phase Locator
        this.editPhaseButton = (phaseName: string) =>
            this.page.locator('li').filter({ hasText: phaseName }).getByRole('button', { name: 'Edit' });
        this.btnSave = page.getByRole('button', { name: 'Save Changes', exact: true });

    }

    // Create New Phase
    async createPhase(status: string) {

        await this.btnAddPhase.click();
        await this.phaseInput.fill('Development Phase');
        await this.phaseNumberInput.fill('2');
        await this.phaseStatusDropdown.click();
        await this.page.getByRole('option', { name: status, exact: true }).click();
        await this.txtPStart.fill('2026-11-01');
        await this.txtPEnd.fill('2026-11-09');
        await this.txtAStart.fill('2026-11-07');
        await this.txtAEnd.fill('2026-11-14');
        await this.btnSaveAddPhase.click();
        await expect(this.successToast).toContainText('Phase added.');
    }

    // Edit function 
    async editPhase(
        phaseName: string,
        status: string
    ) {
        await this.editPhaseButton(phaseName).click();
        await this.phaseStatusDropdown.click();
        await this.page.getByRole('option', { name: status, exact: true }).click();
        await this.txtAStart.fill('2026-11-07');
        await this.txtAEnd.fill('2026-11-14');
        await this.btnSave.click();
        await expect(this.successToast).toContainText('Phase updated.');
    }
}
