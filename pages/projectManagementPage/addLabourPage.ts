import { expect, Locator, Page } from "@playwright/test";

export class addLabour {

    readonly page: Page;
    readonly btnLabour: Locator;
    readonly btnLogHours: Locator;
    readonly txtSearchUser: Locator;
    readonly btnSelectTask: Locator;
    readonly txtWorkDate: Locator;
    readonly txtHours: Locator;
    readonly btnRateSource: Locator;
    readonly btnSelectRole: Locator; // Fast rate master option
    readonly txtHourlyRate: Locator;
    readonly txtLabourDescription: Locator;
    readonly btnSaveData: Locator;
    readonly txtErrorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.btnLabour = page.getByRole('button', { name: 'Labour', exact: true });
        this.btnLogHours = page.getByRole('button', { name: 'Log Hours', exact: true });
        this.txtSearchUser = page.getByPlaceholder('Search users (min 2 chars)…');
        this.btnSelectTask = page.locator('button[aria-haspopup="listbox"]').filter({ hasText: 'Project level' });
        this.txtWorkDate = page.getByTestId('labour-form-work-date-input');
        this.txtHours = page.getByTestId('labour-form-hours-input');
        this.btnRateSource = page.locator('button[aria-haspopup="listbox"]').filter({ hasText: 'From rate master' });
        this.btnSelectRole = page.locator('button[aria-haspopup="listbox"]').filter({ hasText: 'Select role' });
        this.txtHourlyRate = page.getByTestId('labour-form-hourly-rate-input');
        this.txtLabourDescription = page.getByTestId('labour-form-description-input');
        this.btnSaveData = page.getByRole('button', { name: 'Log Hours', exact: true }).last();
        this.txtErrorMessage = page.getByRole('alert');

    }

    async addaLabourDetials() {

        await this.btnLabour.click();
        await this.btnLogHours.click();
        await this.txtSearchUser.fill('Ya');
        await this.page.getByText('Yasasri Banuka Dias Wimalaweera', { exact: true }).click();
        await this.btnSelectTask.click();
        await this.page.getByRole('option', { name: 'TSK-0001 · Develop User Registration Functionality', exact: true }).click();
        await this.txtWorkDate.fill('2026-11-20');
        await this.txtHours.fill('8');
        await this.btnRateSource.click();
        await this.page.getByRole('option', { name: 'Manual override', exact: true }).click();
        await this.txtHourlyRate.fill('2500');
        await this.txtLabourDescription.fill('Labour work for user registration functionality development.');
        await this.btnSaveData.click();
        await expect(this.txtErrorMessage).toContainText('Labour logs and material issues can only be added to active projects');
    }

    async addLabourDetials() {

        await this.btnLabour.click();
        await this.btnLogHours.click();
        await this.txtSearchUser.fill('Pa');
        await this.page.getByText('Praveen Jayaweera', { exact: true }).click();
        await this.btnSelectTask.click();
        await this.page.getByRole('option', { name: 'TSK-0002 · Sub Task : Add Login function Automation', exact: true }).click();
        await this.txtWorkDate.fill('2026-11-23');
        await this.txtHours.fill('8');
        await this.btnRateSource.click();
        await this.page.getByRole('option', { name: 'From rate master', exact: true }).click();
        await this.btnSelectRole.click();
        await this.page.getByRole('option', { name: 'Product Manager — LKR 1000.00/h', exact: true }).click();
        await this.txtLabourDescription.fill('Labour work for user registration functionality development.');
        await this.btnSaveData.click();
        await expect(this.txtErrorMessage).toContainText('Labour logs and material issues can only be added to active projects');
    }
}