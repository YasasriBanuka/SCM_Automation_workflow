import { expect, Locator, Page } from "@playwright/test";

export class addNewTeam {

    readonly page: Page;
    readonly btnCreateTeam: Locator;
    readonly txtTeamName: Locator;
    readonly txtDes: Locator;
    readonly chkUsers: (userName: string) => Locator;
    readonly saveData:Locator;

    constructor(page: Page) {
        this.page = page;
        this.btnCreateTeam = page.getByRole('button', { name: 'Create Team', exact: true });
        this.txtTeamName = page.getByPlaceholder('e.g. Warehouse Floor Staff');
        this.txtDes = page.getByPlaceholder('What does this team handle?');
        this.chkUsers = (userName: string) => {
            return this.page.locator('label').filter({ hasText: userName }).locator('input[type="checkbox"]');
        };
        this.saveData =page.getByRole('button', { name: 'Create Team', exact: true }).last();

    }
    async createTeam() {

        await this.btnCreateTeam.click();
        await this.txtTeamName.fill('Project Management Team');
        await this.txtDes.fill('Team responsible for project management activities.');
        const users = [
            'Yasasri Banuka Dias Wimalaweera',
            'Praveen Jayaweera',
            'Savinda Gammuduwaththa'
        ];

        for (const user of users) {
            await this.chkUsers(user).check();
        }
        await  this.saveData.click();
    }



}
