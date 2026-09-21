import test from "@playwright/test";
import { adminLoginPage } from "../../pages/adminLoginPage/adminLoginPage";
import { archivedSupplierPage } from "../../pages/supplier/archivedSupplierPage";
import { supplierAchived } from "../../pages/supplier/supplierAchivedPage";

test('TC_003 : Verify that the admin can successfully archive a draft supplier details..', async ({ page }) => {

    await page.goto('/signin');

    // SystemAdmin Login
    const adminLogin = new adminLoginPage(page);
    await adminLogin.enterUsername('admin.operations@companydemo.com');
    await adminLogin.enterPassword('Admin@2026!');
    await adminLogin.selectBranch();
    await adminLogin.clickcheckbox();
    await adminLogin.clickLogin();

    // navigation workflow 
    const archived = new archivedSupplierPage(page);
    await archived.clickLblSupplier();
    await archived.clickLblApprovals();
    await archived.navigateToRecentlyActioned();
    await archived.viewSupplierDetails();

    const successArchived = new supplierAchived(page);
    await successArchived.clickbtnArchived();

    await successArchived.addComment('Achived');
    await successArchived.clickArchivebtn();

    // verification 
    await successArchived.verifyArchivedMessage();

});