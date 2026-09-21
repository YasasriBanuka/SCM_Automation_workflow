import { Page, Locator } from '@playwright/test';

export class adminLoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly branchDropdown: Locator;
    readonly branchOption: Locator;
    readonly chkRemeberBox: Locator;
    readonly loginButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('info@gmail.com');
        this.passwordInput = page.getByPlaceholder('Enter your password');
        this.branchDropdown = page.getByRole('button', { name: 'Select your branch'});
        this.branchOption = page.getByRole('option', { name: 'Matara'});
        this.chkRemeberBox = page.getByRole('checkbox');
        this.loginButton = page.getByRole('button', { name: 'Sign In' });
    }

    async enterUsername(username:string) {
        await this.usernameInput.fill(username);
    }
    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }
    async selectBranch() {
        await this.branchDropdown.click();
        await this.branchOption.click();
    }
    async clickcheckbox(){
        await this.chkRemeberBox.check();
    }
    async clickLogin() {
        await this.loginButton.click();
    }
}