import test from "@playwright/test";
import { loginAsAdmin } from "../../utils/login";
import { navigationFlow } from "../../pages/navigationFLow/siteNavigation";
import { addPosPage } from "../../pages/productionOrderPage/addPosPage";
import { importPosPage } from "../../pages/productionOrderPage/importPosPAge";
test('TC_001 : Verify that an admin user can navigate to the PO section without any loading issues ', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);

    const posPage = new navigationFlow(page);
    await posPage.clickPOAction();

})

test('TC_002 : Verify that an admin user can add new PO details ', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);

    const posPage = new navigationFlow(page);
    await posPage.addPOAction();

    const addPos = new addPosPage(page);
    await addPos.enterPoNo(
        'PO_003',
        '100',
        '2026-10-31',
        '2026-12-02',
        'This is a test production order created for automation testing purposes.'
    );

})

test('TC_003 : Verify that an admin user can start the added  POs ', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);

    const posPage = new navigationFlow(page);
    await posPage.clickPOActions('PO_003');

})


test('TC_004 : Verify that an admin import the newly added POs ', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);

    const posPage = new navigationFlow(page);
    await posPage.clickImportPO();

    const importPos = new importPosPage(page);
    await importPos.clickDownloadTemplate();
    await page.waitForTimeout(2000);
    await importPos.uploadExcelFile();

    await page.waitForTimeout(4000);
 
})