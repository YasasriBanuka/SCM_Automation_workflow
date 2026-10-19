import { Locator, Page } from "@playwright/test";

export class inventoryReorderPage {

    readonly page: Page;
    readonly clickOrder: Locator;
    readonly clickReorderSetup : Locator;

    constructor(page: Page) {
        this.page = page;     
        this.clickOrder = page.locator('tbody tr').nth(1).locator('td').nth(0);
        this.clickReorderSetup = page.getByRole('main') .getByRole('link', { name: 'Reorder Setup' });
    }

    async clickReorder() {
         await this.clickOrder.click();
    }

    async btnclickReorderSetup() {
         await this.clickReorderSetup.click();
    }

}