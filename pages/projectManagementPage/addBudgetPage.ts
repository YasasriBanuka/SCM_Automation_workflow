import { expect, Locator, Page } from "@playwright/test";

export class addBudget{

    readonly page:Page;
    readonly btnBudget: Locator;
    readonly btnAddBudget: Locator;
    readonly btnSelectEquipment: Locator;
    readonly txtDescription:Locator;
    readonly txtPlannedAmount: Locator;
    readonly btnAdd:Locator;
    readonly txtSuccessMessage: Locator;


    constructor(page:Page){
        this.page = page;
        this.btnBudget = page.getByRole('button', { name: 'Budget', exact: true });
        this.btnAddBudget = page.getByRole('button', { name: 'Add Line', exact: true });
        this.btnSelectEquipment = page.locator('button[aria-haspopup="listbox"]').filter({ hasText: 'Labour' });
        this.txtDescription = page.getByPlaceholder('e.g. Structural labour — concrete works');
        this.txtPlannedAmount = page.getByTestId('budget-form-planned-amount-input');
        this.btnAdd = page.getByRole('button', { name: 'Add', exact: true }).last();
        this.txtSuccessMessage = page.getByRole('alert');
    }

    async addNewBudget() {

    await this.btnBudget.click();
    await this.btnAddBudget.click();
    await this.btnSelectEquipment.click();
    await this.page.getByRole('option', {name: 'Labour',exact: true}).click();
    await this.txtDescription.fill('Structural labour for concrete works.');
    await this.txtPlannedAmount.fill('25000');
    await this.btnAdd.click();
    await expect(this.txtSuccessMessage).toHaveText('Budget line added.');
}

}