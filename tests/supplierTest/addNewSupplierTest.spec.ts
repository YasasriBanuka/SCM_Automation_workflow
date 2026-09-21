import { test, expect } from '@playwright/test';
import { navigateSupplierPage } from '../../pages/supplier/navigateSupplierPage';
import { adminLoginPage } from '../../pages/adminLoginPage/adminLoginPage';
import { addNewSupplier } from '../../pages/supplier/addNewSupplierPage';

test('TC_002 : Verify that the admin can successfully add a new supplier using valid data.', async ({ page }) => {

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
    await supplierPage.clickbtnAddSupplier();
    
    const addsupplierData = new addNewSupplier(page);

    // Company Information data
    await addsupplierData.enterCompanyInformation(
        'BOI Holding',
        'BOT',
        'Corrugated Boxes',
        'TX-123456723',
        'REG-2024-0089',
        'https://boi.com'
    )
    //Address section Data 
    await addsupplierData.enterAddressDetails(
        '12/A Main Street',
        'Colombo',
        'Western Province',
        '00300',
        'Sri Lanka'
    );
    await addsupplierData.enterContactDetails(
        'Pasindu Wimalaweera',
        'Process Manager',
        'banukadias5+boi@gmail.com',
        '0768843299'
    )
    // Test add contact
    await addsupplierData.clickAddContact();
    //Test Remove contact Button
    await addsupplierData.clickRemoveContact();
    //Test Add Certificate Button
    await addsupplierData.clickAddCertificate();

    await addsupplierData.enterCertificationDetails(
        'ISO 9001:2015',
        'Bureau Veritas',
        '2026-09-18',
        '2027-09-18'
    );

    await addsupplierData.clickAddCertificate();
    await page.waitForTimeout(1000);
    await addsupplierData.clickCertifiacteRemove();

    await addsupplierData.seletcPaymentTerm();
    await addsupplierData.seletcCurrency();

    await addsupplierData.enterPaymentAndBankDetails(
        'Commercial Bank',
        '4209128967811902',
        'BOI Account'
    );

    await addsupplierData.clickSaveSupplier();
    // verification
    await addsupplierData.verifySupplierSavedMessage();

    await page.waitForTimeout(4000);
});