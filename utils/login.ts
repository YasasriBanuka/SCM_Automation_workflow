import { Page } from '@playwright/test';

import { adminUser } from './testData';
import { adminLoginPage } from '../pages/adminLoginPage/adminLoginPage';

export async function loginAsAdmin(page: Page) {

    await page.goto('/signin');

    const adminLogin = new adminLoginPage(page);

    await adminLogin.enterUsername(adminUser.username);
    await adminLogin.enterPassword(adminUser.password);
    await adminLogin.selectBranch();
    await adminLogin.clickcheckbox();
    await adminLogin.clickLogin();
}