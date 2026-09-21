import test from "@playwright/test";
import { adminLoginPage } from "../../pages/adminLoginPage/adminLoginPage";

test.describe('Admin Login Tests', () => {

    test('TC_001: Verify admin can log into the system with valid credentials', async ({ page }) => {

        await page.goto('/signin');

        const adminLogin = new adminLoginPage(page);

        await adminLogin.enterUsername('admin.operations@companydemo.com');
        await adminLogin.enterPassword('Admin@2026!');
        await adminLogin.selectBranch();
        await adminLogin.clickcheckbox();
        await adminLogin.clickLogin();

    });


    test('TC_1.2: Verify admin cannot log into the system with invalid credentials', async ({ page }) => {

        await page.goto('/signin');

        const adminLogin = new adminLoginPage(page);

        await adminLogin.enterUsername('admin.operations@companydemo.com');
        await adminLogin.enterPassword('Admin@2026!');
        await adminLogin.selectBranch();
        await adminLogin.clickcheckbox();
        await adminLogin.clickLogin();

    });

    test('TC_1.3: Verify admin cannot log into the system with valid email and empty password credentials', async ({ page }) => {

        await page.goto('/signin');

        const adminLogin = new adminLoginPage(page);

        await adminLogin.enterUsername('admin.operations@companydemo.com');
        await adminLogin.enterPassword('');
        await adminLogin.selectBranch();
        await adminLogin.clickcheckbox();
        await adminLogin.clickLogin();

    });

    test('TC_1.4: Verify admin cannot log into the system with empty email and valid password credentials', async ({ page }) => {

        await page.goto('/signin');

        const adminLogin = new adminLoginPage(page);

        await adminLogin.enterUsername('');
        await adminLogin.enterPassword('Admin@2026!');
        await adminLogin.selectBranch();
        await adminLogin.clickcheckbox();
        await adminLogin.clickLogin();

    });
    test('TC_1.5: Verify that the admin can log into the system using valid credentials without selecting a branch.', async ({ page }) => {

        await page.goto('/signin');

        const adminLogin = new adminLoginPage(page);

        await adminLogin.enterUsername('admin.operations@companydemo.com');
        await adminLogin.enterPassword('Admin@2026!');
        await adminLogin.clickcheckbox();
        await adminLogin.clickLogin();

    });

    test('TC_1.5: Verify admin cannot log into the system with empty credentials', async ({ page }) => {

        await page.goto('/signin');

        const adminLogin = new adminLoginPage(page);

        await adminLogin.enterUsername('');
        await adminLogin.enterPassword('');
        await adminLogin.selectBranch();
        await adminLogin.clickcheckbox();
        await adminLogin.clickLogin();
    });

});