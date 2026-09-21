import test from "@playwright/test";
import { adminLoginPage } from "../../pages/adminLoginPage/adminLoginPage";
import { navigateSupplierPage } from "../../pages/supplier/navigateSupplierPage";
import { importSupplier } from "../../pages/supplier/ImportSupplierPage";
import { verifyValidSupplierData } from "../../pages/supplier/verifyValidSupplierDataPage";



test('TC_005 :Validate that the admin can successfully import supplier details using a valid file.', async ({ page }) => {

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
    await supplierPage.clickImport();

    // Import file work flow
    const importSuppliers = new importSupplier(page);
    await importSuppliers.clickDownloadTemplate();
    await importSuppliers.verifyUploadPreviewDisabled(); 
    await importSuppliers.uploadExcelFile();
    await importSuppliers.verifyUploadPreviewEnabled();
    await importSuppliers.clickUploadPreview();
   
    //Verify valid supplir data
    const verifyValidData = new verifyValidSupplierData(page);
    await verifyValidData.clickEditRow2();
    
    await verifyValidData.reEnterTitle(
        'Product Manager'
    )
    // click Re-Validate Button
    await verifyValidData.clickRevalidateRow();
    // click import button
    await verifyValidData.clickImportOneRow();
    // click done button
    await verifyValidData.clickDone();
    // verification message 
    await verifyValidData.verifySupplierImportedMessage();
    
    await page.waitForTimeout(6000);
    
});