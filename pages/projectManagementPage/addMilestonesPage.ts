import { expect, Locator, Page } from "@playwright/test";

export class addNewMilestone {

    readonly page: Page;
    readonly btnMilestones: Locator;
    readonly btnAddMilestone: Locator;
    readonly txtName: Locator;
    readonly txtPDate: Locator;
    readonly descriptionTextArea: Locator;
    readonly btnSaveMilestone: Locator;
    readonly toastSuccessMessage: Locator;
    readonly achiveButton: (milseName: string) => Locator;
    readonly btnMarkAchieved: Locator;
    readonly toastAchievedMessage: Locator;


    constructor(page: Page) {
        this.page = page;
        this.btnMilestones = page.getByRole('button', { name: 'Milestones', exact: true });
        this.btnAddMilestone = page.getByRole('button', { name: 'Add Milestone', exact: true });
        this.txtName = page.locator('input[required]').nth(0);
        this.txtPDate = page.locator('input[type="date"]');
        this.descriptionTextArea = page.locator('textarea.w-full.rounded-lg');
        this.btnSaveMilestone = page.getByRole('button', { name: 'Add Milestone', exact: true }).last();
        this.toastSuccessMessage = page.getByRole('alert');


        this.achiveButton = (milseName: string) =>
            this.page.locator('li').filter({ hasText: milseName }).getByRole('button', { name: 'Mark achieved' });
        this.btnMarkAchieved = page.getByRole('button', { name: 'Mark achieved' });
        this.toastAchievedMessage = this.page.getByRole('alert');

    }

    async addMils() {
        await this.btnMilestones.click();
        await this.btnAddMilestone.click();
        await this.txtName.fill('Project Planning');
        await this.txtPDate.fill('2026-11-15');
        await this.descriptionTextArea.fill('This project is created for office management.');
        await this.btnSaveMilestone.click();
        await expect(this.toastSuccessMessage).toHaveText('Milestone created.');
    }

    async achiveMile(
        miles: string
    ) {
        await this.btnMilestones.click();
        await this.achiveButton(miles).click();
        await expect(this.toastAchievedMessage).toHaveText('Milestone achieved.');
    }
}
