import { expect, Locator, Page } from "@playwright/test";
import { LoadFnOutput } from "module";

export class addNewProject {

    readonly page: Page;
    readonly pName: Locator;
    readonly pType: Locator;
    readonly selectType: Locator;
    readonly addPm: Locator;
    readonly selectPm: Locator;
    readonly startDateInput: Locator;
    readonly endDateInput: Locator;
    readonly amountInput: Locator;
    readonly currencyDropdown: Locator;
    readonly projectNote: Locator;
    readonly successToast:Locator;
    readonly btnCreateProject:Locator;

    constructor(page: Page) {
        this.page = page;
        this.pName = page.getByPlaceholder('e.g. Downtown Office Fit-out');
        this.pType = page.getByRole('button', { name: 'Construction' });
        this.selectType = page.getByRole('option', { name: 'IT', exact: true });
        this.addPm =  page.locator('input[placeholder="Search users (min 2 chars)…"]');
        this.selectPm = page.getByRole('button', {name: /Yasasri Banuka Dias Wimalaweera/});
        this.startDateInput = page.locator('input[type="date"]').nth(0);
        this.endDateInput = page.locator('input[type="date"]').nth(1);
        this.amountInput = page.locator('input[placeholder="0.00"]');
        this.currencyDropdown = page.getByRole('button', { name: 'LKR', exact: true });
        this.projectNote = page.getByPlaceholder('Optional notes about the project scope…');
        this.successToast = page.locator('.Toastify__toast--success');
        this.btnCreateProject = page.getByRole('button',{name:'Create Project',exact:true});
    }

    async createProject() {
        await this.pName.fill('HR Management System Development');
        await this.pType.click();
        await this.selectType.click();
        await this.addPm.fill('Yasasri Banuka Dias Wimalaweera');
        await this.selectPm.click();
        await this.startDateInput.fill('2026-11-05');
        await this.endDateInput.fill('2026-12-30');
        await this.amountInput.fill('250000');
        await this.currencyDropdown.click();
        await this.page.getByRole('option', { name: 'LKR', exact: true }).click();
        await this.projectNote.fill('Development of an HR Management System.');
        await this.btnCreateProject.click();
        await expect(this.successToast).toContainText('Project created successfully.');
    }
}