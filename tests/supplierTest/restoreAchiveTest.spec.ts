
import test from "@playwright/test";
import { adminLoginPage } from "../../pages/adminLoginPage/adminLoginPage";
import { restoreArchiveSupplies } from "../../pages/supplier/restoreAchiveSupplierPage";



test('TC_007 : Verify that the admin can successfully restore an archived supplier', async ({ page }) => {

    await page.goto('/signin');

    // SystemAdmin Login
    const adminLogin = new adminLoginPage(page);
    await adminLogin.enterUsername('admin.operations@companydemo.com');
    await adminLogin.enterPassword('Admin@2026!');
    await adminLogin.selectBranch();
    await adminLogin.clickcheckbox();
    await adminLogin.clickLogin();

    const restorArchive = new restoreArchiveSupplies(page);
    await restorArchive.clickLblSupplier();
    await restorArchive.clicklblDirectory();
    await restorArchive.clicklblAchive();
    await restorArchive.clickRestore();

    // Verification
    await restorArchive.verifySCMRestoredMessage();
    await restorArchive.verifySupplierRestoredMessage();

    await page.waitForTimeout(4000);
    

});
