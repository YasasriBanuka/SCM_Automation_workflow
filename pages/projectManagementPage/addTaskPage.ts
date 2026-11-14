import { expect, Locator, Page } from "@playwright/test";

export class addNewTask {

    readonly page: Page;
    readonly btnTasks: Locator;
    readonly btnAddTask: Locator;
    readonly txtTitle: Locator;
    readonly btnSelectPhase: Locator;
    readonly txtSearchUser: Locator;
    readonly btnPriority: Locator;
    readonly btnStatus: Locator;
    readonly txtEstimatedHours: Locator;
    readonly txtProgress: Locator;
    readonly txtPlannedDate: Locator;
    readonly txtPlannedEndDate: Locator;
    readonly txtDescription: Locator;
    readonly btnCreate: Locator;

    //Add sub task 
    readonly btnAddSubtask: (taskId: string) => Locator;
    readonly btnAddDependancies: (taskId: string) => Locator;
    readonly btnSelectTask: Locator;
    readonly txtNumber: Locator;
    readonly btnDone:Locator;

    constructor(page: Page) {
        this.page = page;
        this.btnTasks = page.getByRole('button', { name: 'Tasks', exact: true });
        this.btnAddTask = page.getByRole('button', { name: 'Add Task', exact: true });
        this.txtTitle = page.locator('input[required]').nth(0);
        this.btnSelectPhase = page.locator('button[aria-haspopup="listbox"]').nth(0);
        this.txtSearchUser = page.locator('input[placeholder="Search users (min 2 chars)…"]');
        this.btnPriority = page.locator('button[aria-haspopup="listbox"]').filter({ hasText: 'Medium' });
        this.btnStatus = page.locator('button[aria-haspopup="listbox"]').filter({ hasText: 'To Do' });
        this.txtEstimatedHours = page.locator('input[type="number"][step="0.5"]');
        this.txtProgress = page.locator('input[type="number"][max="100"]');
        this.txtPlannedDate = page.locator('input[type="date"]').nth(0);
        this.txtPlannedEndDate = page.locator('input[type="date"]').nth(1);
        this.txtDescription = page.locator('textarea.w-full.rounded-lg').nth(0);
        this.btnCreate = page.getByRole('button', { name: 'Create', exact: true });

        this.btnAddSubtask = (taskId: string) =>
            this.page.locator('tr').filter({ hasText: taskId }).getByRole('button', { name: 'Add subtask' });

        this.btnAddDependancies = (taskId: string) =>
            this.page.locator('tr').filter({ hasText: taskId }).getByRole('button', { name: 'Dependencies' });
        this.btnSelectTask = page.locator('button[aria-haspopup="listbox"]').filter({ hasText: '— Select task —' });

        this.txtNumber = page.locator('input[type="number"][min="0"]');
        this.btnDone = page.getByRole('button',{name:'Done',exact:true});
    }

    async addTask(
        title: string,
        phaseName: string,
        userName: string,
        priority: string,
        status: string,
        EstimatedHours: string,
        progress: string,
        description: string
    ) {
        await this.btnTasks.click();
        await this.btnAddTask.click();
        await this.txtTitle.fill(title);
        await this.btnSelectPhase.click();
        await this.page.getByRole('option', { name: phaseName }).click();
        await this.txtSearchUser.fill('Yas');
        await this.page.getByText(userName, { exact: true }).click();
        await this.btnPriority.click();
        await this.page.getByRole('option', { name: priority, exact: true }).click();
        await this.btnStatus.click();
        await this.page.getByRole('option', { name: status, exact: true }).click();
        await this.txtEstimatedHours.fill(EstimatedHours);
        await this.txtProgress.fill(progress);
        await this.txtPlannedDate.fill('2026-11-15');
        await this.txtPlannedEndDate.fill('2026-11-15');
        await this.txtDescription.fill(description);

        await this.btnCreate.click();
    }

    //add sub task 
    async clickAddSubtask(

        taskId: string,
        title: string,
        phaseName: string,
        uName: string,
        priority: string,
        status: string,
        EstimatedHours: string,
        progress: string,
        description: string
    ) {
        await this.btnTasks.click();
        const addButton = this.btnAddSubtask(taskId);
        await expect(addButton).toBeVisible();
        await addButton.click();
        await this.txtTitle.fill(title);
        await this.btnSelectPhase.click();
        await this.page.getByRole('option', { name: phaseName }).click();
        await this.txtSearchUser.fill('Praveen');
        await this.page.getByText(uName, { exact: true }).click();
        await this.btnPriority.click();
        await this.page.getByRole('option', { name: priority, exact: true }).click();
        await this.btnStatus.click();
        await this.page.getByRole('option', { name: status, exact: true }).click();
        await this.txtEstimatedHours.fill(EstimatedHours);
        await this.txtProgress.fill(progress);
        await this.txtPlannedDate.fill('2026-11-15');
        await this.txtPlannedEndDate.fill('2026-11-15');
        await this.txtDescription.fill(description);
        await this.btnCreate.click();

    }

    async addDependencies(
        taskId: string,
        taskName: string
    ) {

        await this.btnTasks.click();
        const addDependencies = this.btnAddDependancies(taskId);
        await expect(addDependencies).toBeVisible();
        await addDependencies.click();

        await this.btnSelectTask.click();

        const taskOption = this.page.getByRole('option', { name: taskName, exact: true });
        await taskOption.click();
        await this.txtNumber.fill('5');

        await this.btnDone.click();

    }
}
