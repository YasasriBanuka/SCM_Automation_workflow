import { expect, Locator, Page } from "@playwright/test";


export class createLink {

    readonly page: Page
    readonly txtEmail: Locator;
    readonly txtExpire: Locator;
    readonly txtQuantity: Locator;
    readonly btnSendLink: Locator;
    readonly toastSuccess: Locator;

    constructor(page: Page) {

        this.page = page;
        this.txtEmail = page.getByPlaceholder('name@example.com');
        this.txtExpire = page.locator('input[type="number"][min="1"]').nth(0);
        this.txtQuantity = page.locator('input[type="number"][min="1"]').nth(1);
        this.btnSendLink = page.getByRole('button', { name: 'Send Link', exact: true });
        this.toastSuccess = page.locator('.Toastify__toast--success');
    }
    async createComLink(
        email: string,
        exdate: string,
        qty: string
    ) {
        await this.txtEmail.fill(email);
        await this.txtExpire.fill(exdate);
        await this.txtQuantity.fill(qty);
        await this.btnSendLink.click();
        await expect(this.toastSuccess).toContainText(`Portal link emailed to ${email}.`);
    }

}
