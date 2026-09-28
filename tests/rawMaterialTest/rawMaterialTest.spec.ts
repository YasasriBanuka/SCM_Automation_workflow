import { test } from '@playwright/test';
import { AddRawMaterialData } from '../../pages/rawMaterials/addRawMaterialData';
import { changeRawMaterilaDetails } from '../../pages/rawMaterials/chnageAddedRawMatDetailsPage';
import { loginAsAdmin } from '../../utils/login';
import { addRawMaterial, fillRawMaterialWithoutDescription, fillRawMaterialWithoutItemCode, notdeactivateRawMaterial } from '../../utils/rawMaterialUtility';
import { navigationFlow } from '../../pages/navigationFLow/siteNavigation';
import { updateRawMaterialToPCS } from '../../utils/rawMaterialUtility';
import { rawMaterialData } from '../../utils/testData';
import { navigateRawMaterialPage } from '../../pages/rawMaterials/navigateRawMaterialPage';

test('TC_001 : Verify that an admin user can successfully create a new Raw Material with valid details.', async ({ page }) => {

    await loginAsAdmin(page);

    const rawMaterialPage = new navigationFlow(page);
    // Navigate to Raw Materials
    await rawMaterialPage.clickLblRawMaterial();
    await rawMaterialPage.ClicklblRawMaterials();
    // Click Add New Raw Material
    await rawMaterialPage.clickbbtnAddRawMaterial();
    // Add Raw Material using utility
    await addRawMaterial(page);
    const addRawMaterialPage = new AddRawMaterialData(page);
    await addRawMaterialPage.clickAddMaterial();
    await addRawMaterialPage.verifyRawMaterial();
});

test('TC_002 : Verify Item Code mandatory validation', async ({ page }) => {

    await loginAsAdmin(page);
    const rawMaterialPage = new navigationFlow(page);
    await rawMaterialPage.clickLblRawMaterial();
    await rawMaterialPage.ClicklblRawMaterials();
    await rawMaterialPage.clickbbtnAddRawMaterial();

    const addRawMaterialPage = new AddRawMaterialData(page);
    // Fill Raw Material details without Item Code
    await fillRawMaterialWithoutItemCode(page);
    await addRawMaterialPage.clickAddMaterial();
    await addRawMaterialPage.verifyItemCodeRequiredError();
});

test('TC_003 : Verify "Raw Material" name mandatory validation', async ({ page }) => {

    await loginAsAdmin(page);

    const rawMaterialPage = new navigationFlow(page);

    await rawMaterialPage.clickLblRawMaterial();
    await rawMaterialPage.ClicklblRawMaterials();
    await rawMaterialPage.clickbbtnAddRawMaterial();

    const addRawMaterialPage = new AddRawMaterialData(page);
    // Fill Raw Material details without Description
    await fillRawMaterialWithoutDescription(page);
    await addRawMaterialPage.clickAddMaterial();
    await addRawMaterialPage.verifyDescriptionRequiredError();
});

test('TC_004: Verify admin can view and change added Raw Material Details', async ({ page }) => {

    await loginAsAdmin(page);

    const rawMaterialPage = new navigationFlow(page);
    await rawMaterialPage.clickLblRawMaterial();
    await rawMaterialPage.ClicklblRawMaterials();    
    await rawMaterialPage.clickRMRow();
    await updateRawMaterialToPCS(page);
});

test('TC_005: Verify duplicate Item Code', async ({ page }) => {

    await loginAsAdmin(page);

    const rawMaterialPage = new navigationFlow(page);
    await rawMaterialPage.clickLblRawMaterial();
    await rawMaterialPage.ClicklblRawMaterials();
    await rawMaterialPage.clickbbtnAddRawMaterial();

    // Enter existing Raw Material data
    await addRawMaterial(page);
    const addRawMaterialPage = new AddRawMaterialData(page);
    await addRawMaterialPage.clickAddMaterial();
    await addRawMaterialPage.verifyRawMaterialCreationFailed(
        rawMaterialData.itemCode
    );
});
test('TC_006 Verify admin can view and deactivate added Raw Material Details', async ({ page }) => {

    await loginAsAdmin(page);

    const rawMaterialPage = new navigationFlow (page); 
    // Navigate to Raw Materials
    await rawMaterialPage.clickLblRawMaterial();
    // Move to Raw Material page section
    await rawMaterialPage.ClicklblRawMaterials();
    // Click RM_003
    await page.getByText(
        rawMaterialData.deactivate.itemCode,{ exact: true }).click();
    const changeValue = new changeRawMaterilaDetails(page);
    await changeValue.clickDeactivateButton();
    await changeValue.confirmDeactivate();
    await changeValue.verifyDeactivateSuccessMessage(); 
});
test.only('TC_007 Verify admin cannot deactivate a raw material used in a product', async ({ page }) => {

    await loginAsAdmin(page);

    const rawMaterialPage = new navigationFlow(page);

    // Navigate to Raw Materials
    await rawMaterialPage.clickLblRawMaterial();
    await rawMaterialPage.ClicklblRawMaterials();

    // Try to deactivate RM_001
    await notdeactivateRawMaterial(page);
});




