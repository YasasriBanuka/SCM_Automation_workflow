import { expect, Locator, Page } from "@playwright/test";

export class transportRate {

    readonly page: Page;
    readonly btnAddRate: Locator;
    readonly drpbtnRateUnit: Locator;
    readonly drpservicetype: Locator;
    readonly drpZone: Locator;
    readonly txtMinValue: Locator;
    readonly txtMaxValue: Locator;
    readonly txtRateAmount: Locator;
    readonly txtEffectiveDateFrom: Locator;
    readonly txtEffectiveDateTo: Locator;
    readonly txtNote: Locator;
    readonly btnaddRate: Locator;

    readonly btnDoc: Locator;
    readonly fileUpload: Locator;
    readonly btncategory: Locator;
    readonly txtExpireDate: Locator;
    readonly btnDocSave: Locator;

    constructor(page: Page) {
        this.page = page;
        this.btnAddRate = page.getByRole('button', { name: 'Add Rate', exact: true });
        this.drpbtnRateUnit = page.getByRole('button', { name: 'Select…' });
        this.drpservicetype = page.getByRole('button', { name: 'Any' });
        this.drpZone = page.getByRole('button', { name: 'All zones' });
        this.txtMinValue = page.locator('input[placeholder="0"]');
        this.txtMaxValue = page.locator('input[placeholder="100"]');
        this.txtRateAmount = page.locator('input[placeholder="125.50"]');
        this.txtEffectiveDateFrom = page.locator('input[type="date"]').nth(0);
        this.txtEffectiveDateTo = page.locator('input[type="date"]').nth(1);
        this.txtNote = page.getByPlaceholder('Notes about this rate…');
        this.btnaddRate = page.getByRole('button', { name: 'Add Rate', exact: true }).last();

        // Doc upload workflow
        this.btnDoc = page.getByRole('button', { name: 'Upload', exact: true });
        this.fileUpload = page.locator('input[type="file"]');
        this.btncategory = page.getByRole('button', { name: 'Select category…' });
        this.txtExpireDate = page.locator('input[type="date"]');
        this.btnDocSave = page.getByRole('button', { name: 'Upload', exact: true }).last();
    }

    async addTransportRate(

        minValue: number,
        maxValue: number,
        rateAmount: number,
        effectiveDateFrom: string,
        effectiveDateTo: string,
        note: string
    ) {

        await this.btnAddRate.click();
        await this.drpbtnRateUnit.click();
        await this.page.getByRole('option', { name: 'per km', exact: true }).click();
        await this.drpservicetype.click();
        await this.page.getByRole('option', { name: 'express', exact: true }).click();
        await this.drpZone.click();
        await this.page.getByRole('option', { name: 'Southern Province', exact: true }).click();
        await this.txtMinValue.fill(minValue.toString());
        await this.txtMaxValue.fill(maxValue.toString());
        await this.txtRateAmount.fill(rateAmount.toString());
        await this.txtEffectiveDateFrom.fill(effectiveDateFrom);
        await this.txtEffectiveDateTo.fill(effectiveDateTo);
        await this.txtNote.fill(note);
        await this.btnaddRate.click();
        await expect(this.page.locator('.Toastify__toast--success')).toContainText('Rate added successfully.');
    }

    async uploadDoc(
        date: string,
       
    ) {
        await this.btnDoc.click();
        await this.fileUpload.setInputFiles('uploads\\insurance_Certificate.jpg');
        await this.btncategory.click();
        await this.page.getByRole('option', { name: 'Insurance', exact: true }).click();
        await this.txtExpireDate.fill(date);
        await this.btnDocSave.click();
        await expect(
        this.page.getByText('Document uploaded', { exact: false })
    ).toBeVisible();
    }
}