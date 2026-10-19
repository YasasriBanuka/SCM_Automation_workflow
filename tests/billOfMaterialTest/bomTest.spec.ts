import test from "@playwright/test";
import { loginAsAdmin } from "../../utils/login";
import { navigationFlow } from "../../pages/navigationFLow/siteNavigation";
import { addNewBom } from "../../pages/bom/addNewBomPage";

test('TC_001 : Verify that an admin user can move to BOM section successfully ', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);

    const siteNav = new navigationFlow(page);
    // Navigate to BOM section
    await siteNav.clickBillOfMaterial();

})

test('TC_002 : Verify that an admin user can add a new BOM details successfully ', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);

    const siteNav = new navigationFlow(page);
    // Navigate to BOM section
    await siteNav.clickAddBillOfMaterial();

    const addBom = new addNewBom(page);
    await addBom.enterBomNo('BOM-2026-001');

    // Select finished product
    await addBom.selectFinishedProduct();

    // Enter BOM details
    await addBom.enterdetails(
        'Standard assembly recipe',
        250, 
        'Any notes about this BOM…'
    );
    await addBom.clickSave();
    await addBom.verifySuccessMessage('BOM-2026-001');
})

test.only('TC_003 : Verify that an admin user can add a activate added BOM details successfully ', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);

    const siteNav = new navigationFlow(page);
    // Navigate to BOM section
    await siteNav.clickBillOfMaterial();

    const bomActivation = new addNewBom(page);
    await bomActivation.clickBom('BOM-2026-001');
    await bomActivation.clickActivate();
    await bomActivation.verifyBomActivatedMessage('BOM-2026-001');
    await page.waitForTimeout(2000);     

})


