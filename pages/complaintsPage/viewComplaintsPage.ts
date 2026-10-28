import { expect, Locator, Page } from "@playwright/test";

export class viewComplaints {

    readonly page: Page;
    readonly btnAssign: Locator;
    readonly drpSearchstaff: Locator;
    readonly txtSearchStaff: Locator;
    readonly optstaff: Locator;
    readonly txtComments: Locator;
    readonly toastSuccess: Locator;
    readonly clickbtnAssign:Locator;
    readonly btnStartWork:Locator;
    readonly txtInternalNote : Locator;
    readonly btnAdd:Locator;



    constructor(page: Page) {

        this.page = page;
        this.btnAssign = page.getByRole('button', { name: 'Assign', exact: true });
        this.drpSearchstaff = page.getByRole('button', { name: 'Search staff…' });
        this.txtSearchStaff = page.getByPlaceholder('Search by name or email...');
        this.optstaff = page.getByRole('button', { name: /Yasasri Banuka Dias Wimalaweera/ });

        this.txtComments = page.getByPlaceholder('Add context for the assignee...');
        this.clickbtnAssign = page.getByRole('button', { name: 'Assign', exact: true }).last();
        this.toastSuccess = page.locator('.Toastify__toast--success');
        this.btnStartWork = page.getByRole('button',{name:'Start Work',exact:true});
        this.txtInternalNote = page.getByPlaceholder('Add an internal note...');
        this.btnAdd = page.getByRole('button',{name:' Add',exact:true});
    }

    async assignUser(

        comment: string
    ) {
        await this.btnAssign.click();
        await this.drpSearchstaff.click();
        await this.txtSearchStaff.fill('Yasasri');
        await this.page.getByText('Yasasri Banuka Dias Wimalaweera', { exact: true });
        await this.optstaff.waitFor({ state: 'visible' });
        await this.optstaff.click();
        await this.txtComments.fill(comment);
        await this.clickbtnAssign.click();     
    }
    async clickStartWork(){
        await this.btnStartWork.click();
        await expect(this.toastSuccess).toContainText('Status changed to In Progress.');
    }

    async addNote(
        internalNote:string,
    ){
        await this.txtInternalNote.fill(internalNote);
        await this.btnAdd.click();
        await expect(this.toastSuccess).toContainText('Note added.');

    }
}