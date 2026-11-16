
import { expect, Locator, Page } from "@playwright/test";

export class addNewStaffTask {

    readonly page: Page;

    readonly btnCreateTask: Locator;
    readonly txtTaskTitle: Locator;
    readonly txtDes: Locator;
    readonly txtReqAction: Locator;

    readonly btnPriority: Locator;
    readonly txtDateTime: Locator;
    readonly btnSelectUser: Locator;
    readonly btnSelectTeam: Locator;

    readonly btnVerification: Locator;
    readonly btnRecurringTask: Locator;
    readonly saveData: Locator;

    constructor(page: Page) {
        this.page = page;

        // Common dropdown locator
        const dropdown = page.locator('button[aria-haspopup="listbox"]');

        this.btnCreateTask = page.getByRole('button', { name: 'Create Task', exact: true });

        this.txtTaskTitle = page.getByPlaceholder('e.g. Reconcile Q3 supplier invoices');
        this.txtDes = page.getByPlaceholder('Context, background, or details…');
        this.txtReqAction = page.getByPlaceholder('What must the assignee do to complete this task…');
        this.btnPriority = dropdown.filter({ hasText: /^Medium$/ });
        this.txtDateTime = page.locator('input[type="datetime-local"]');
        this.btnSelectUser = dropdown.filter({ hasText: '— None —' }).first();
        this.btnSelectTeam = dropdown.filter({ hasText: '— None —' }).last();
        this.btnVerification = page.getByRole('switch', { name: 'Verification required' });
        this.btnRecurringTask = page.getByRole('switch', { name: 'Recurring task' });
        this.saveData = page.getByRole('button', { name: 'Create Task', exact: true }).last();
    }

    async createTask() {

        await this.btnCreateTask.click();
        await this.txtTaskTitle.fill('Complete Project Requirements Review');
        await this.txtDes.fill(
            'Review the project requirements and verify that all necessary details are documented.'
        );
        await this.txtReqAction.fill(
            'Review the requirements, identify missing information, and update the project documentation.'
        );
        await this.btnPriority.click();
        await this.page.getByRole('option', { name: 'High', exact: true }).click();
        await this.txtDateTime.fill('2026-11-20T09:00');
        await this.btnSelectUser.click();
        await this.page.getByRole('option', {name: 'Yasasri Banuka Dias Wimalaweera',exact: true}).click();

        await this.btnSelectTeam.click();
        await this.page.getByRole('option', { name: 'Project Management Team',exact: true}).click();
        await this.btnVerification.setChecked(true);
       // await this.btnRecurringTask.setChecked(true);
        await this.saveData.click();
    }
}
