import { test, expect } from '@playwright/test';
import { adminLoginPage } from '../../pages/adminLoginPage/adminLoginPage';
import { navigateSupplierPage } from '../../pages/supplier/navigateSupplierPage';

test('TC_008 : Verify that the admin can successfully export all supplier details.', async ({ page }) => {

    await page.goto('/signin');
    //SystemAdmin Login
    const adminLogin = new adminLoginPage(page);
    await adminLogin.enterUsername('admin.operations@companydemo.com');
    await adminLogin.enterPassword('Admin@2026!');
    await adminLogin.selectBranch();
    await adminLogin.clickcheckbox();
    await adminLogin.clickLogin();
    
    // Supplier Navigation and Form Interaction Automation
    const supplierPage = new navigateSupplierPage(page);
    await supplierPage.clickLblSupplier();
    await supplierPage.ClicklblDirectory();
    await supplierPage.clickExport();

})