import { expect, Locator, Page } from "@playwright/test";

export class viewNewStaffTask {

    readonly page: Page;
    readonly txtComment: Locator;
    readonly btnAdd: Locator;
    readonly btnUpload: Locator;
    readonly btnStartTask : Locator;
    readonly completeTask:Locator;
    readonly txtSuccessMessage:Locator;

    constructor(page: Page) {
        this.page = page;
        this.txtComment = page.getByPlaceholder('Add a comment…');
        this.btnAdd = page.getByRole('button', {name: 'Post',exact: true});
        this.btnUpload = page.getByRole('button', {name: 'Upload',exact: true});
        this.btnStartTask = page.getByRole('button',{name:'Start Task',exact:true});
        this.txtSuccessMessage = page.getByRole('alert');
        this.completeTask = page.getByRole('button', {name: ' Mark Complete',exact: true});
    }

    async updateTask(){
        await this.txtComment.fill('Task reviewed and approved for project development activities.');
        await this.btnAdd.click();
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.btnUpload.click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles('uploads\\staffTask.png');
        await this.btnStartTask.click();
        await expect(this.txtSuccessMessage).toContainText('Status updated.');
    }
    async pendingTask(){
        await this.completeTask .click();
    }

   
}
 