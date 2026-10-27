import { expect, Locator, Page } from "@playwright/test";

export class updateCustomer {

    readonly page: Page;
    readonly btnSubmitApproval: Locator;
    readonly txtComment: Locator;
    readonly btnSubmit: Locator;

    readonly txtSearchPriceList: Locator;
    readonly optPriceList: Locator;
    readonly btnSaveChanges: Locator;
    readonly btnUploadDoc: Locator;
    readonly fileUpload: Locator;
    readonly drpCreditAgreement: Locator;
    readonly txtAgreementDate: Locator;
    readonly btnUpload: Locator;
    readonly btnApprove: Locator;
    readonly txtAddComment: Locator;
    readonly buttonApprove: Locator;


    constructor(page: Page) {

        this.page = page;
        this.btnSubmitApproval = page.getByRole('button', { name: 'Submit for Approval', exact: true });
        this.txtComment = page.getByPlaceholder('Add a comment…');
        this.btnSubmit = page.getByRole('button', { name: 'Submit', exact: true });

        this.txtSearchPriceList = page.getByPlaceholder("Search price list by name or code…");
        this.optPriceList = page.getByText("Standard_Retail_Price_List_2026 · LKR", { exact: true });

        this.btnSaveChanges = page.getByRole('button', { name: 'Save Changes', exact: true });
        this.btnUploadDoc = page.getByRole('button', { name: 'Upload Document', exact: true });
        this.fileUpload = page.locator('input[type="file"]');
        this.drpCreditAgreement = page.getByRole('button', { name: 'Select category…' });
        this.txtAgreementDate = page.locator('input[type="date"]');
        this.btnUpload = page.getByRole('button', { name: 'Upload', exact: true });

        this.btnApprove = page.getByRole('button', { name: 'Approve', exact: true });
        this.txtAddComment = page.getByPlaceholder('Add a comment…');
        this.buttonApprove = page.getByRole('button', { name: 'Approve', exact: true }).last();
    }

    async clickMoveToPendingApproval(

        comment: string
    ) {
        await this.btnSubmitApproval.click();
        await this.txtComment.fill(comment);
        await this.btnSubmit.click();
        await expect(this.page.locator('.Toastify__toast--success')).toContainText(`Status updated successfully.`);
    }

    async selectPriceList() {

        await this.txtSearchPriceList.fill("Standard_Retail_Price_List_2026");
        await this.optPriceList.waitFor({ state: "visible" });
        await this.optPriceList.click();
        await this.btnSaveChanges.click();
        await expect(this.page.locator('.Toastify__toast--success')).toContainText(`Customer updated successfully.`);
    }

    async addDocuments(
        date: string
    ) {
        await this.btnUploadDoc.click();
        await this.fileUpload.setInputFiles('uploads\\creditAgreemnet.png');
        await this.drpCreditAgreement.click();
        await this.page.getByText('Credit Agreement', { exact: true }).click();
        await this.txtAgreementDate.fill(date);
        await this.btnUpload.click();
    }

    async clickApproval(
        comment: string
    ) {
        await this.btnApprove.click();
        await this.txtAddComment.fill(comment);
        await this.buttonApprove.click();
        await expect(this.page.locator('.Toastify__toast--error ')).toContainText(`You cannot approve a customer you submitted yourself`);
    }

    async approvalSuccess(

         comment: string
    ){
        await this.btnApprove.click();
        await this.txtAddComment.fill(comment);
        await this.buttonApprove.click();
        await expect(this.page.locator('.Toastify__toast--success ')).toContainText(`Status updated successfully.`);
    }
    }



