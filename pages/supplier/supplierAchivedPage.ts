import { Page, Locator, expect } from "@playwright/test";

export class supplierAchived {

    readonly page: Page;
    readonly btnArchived: Locator;
    readonly txtareaComment: Locator;
    readonly btnArchive: Locator; 
    readonly toastArchivedMessage: Locator;

    constructor(page: Page) {

        this.page = page;
        this.btnArchived = page.getByRole('button', { name: 'Archive' });
        this.txtareaComment = page.locator('#status-comment');
        this.btnArchive = page.getByRole('dialog').getByRole('button', { name: 'Archive' });
        this.toastArchivedMessage = page.getByRole('alert');

    }
    async clickbtnArchived() {
        await this.btnArchived.click();
    }
    async addComment(
        comment: string
    ) {
        await this.txtareaComment.fill(comment);
    }
    async clickArchivebtn(){
        await this.btnArchive.click();
    }
    // verifycation
    async verifyArchivedMessage() {
    await expect(this.toastArchivedMessage).toContainText('Supplier archived.');
}

}