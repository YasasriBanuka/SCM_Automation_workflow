import { expect, Locator, Page } from "@playwright/test";

export class labourRate{

    readonly page:Page;
    readonly txtRoleTitle: Locator;
    readonly txtHourlyRate: Locator;
    readonly btnSelectCurrency: Locator;
    readonly btnAdd: Locator;
    readonly successToast:Locator;

    constructor(page:Page){
        this.page=page;
        this.txtRoleTitle = page.getByTestId('labour-rate-form-role-title-input');
        this.txtHourlyRate = page.getByTestId('labour-rate-form-hourly-rate-input');
        this.btnSelectCurrency = page.locator('button[aria-haspopup="listbox"]').filter({ hasText: /^LKR$/ });
        this.btnAdd = page.getByRole('button', { name: 'Add',exact: true});
        this.successToast = page.locator('.Toastify__toast--success');
    }
    async addLabourRate(){
        await this.txtRoleTitle.fill('QA Engineer');
        await this.txtHourlyRate.fill('1500');
        await expect(this.btnSelectCurrency).toContainText('LKR');
        await this.btnAdd.click();
        await expect(this.successToast).toContainText('Rate created.');
    }


}