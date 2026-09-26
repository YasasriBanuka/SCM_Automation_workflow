import { test } from '@playwright/test';
import { navigateRawMaterialPage } from '../../pages/rawMaterials/navigateRawMaterialPage';
import { adminLoginPage } from '../../pages/adminLoginPage/adminLoginPage';
import { AddRawMaterialData } from '../../pages/rawMaterials/addRawMaterialData';
import { changeRawMaterilaDetails } from '../../pages/rawMaterials/chnageAddedRawMatDetailsPage';
import { loginAsAdmin } from '../../utils/login';


test('TC_001 : Verify that an admin user can successfully create a new Raw Material with valid details.', async ({ page }) => {

  await page.goto('/signin');

  await loginAsAdmin(page);

  const rawMaterialPage = new navigateRawMaterialPage(page);
  // Navigate to Raw Materials
  await rawMaterialPage.clickLblRawMaterial();
  // Move to raw Material page section
  await rawMaterialPage.ClicklblRawMaterials();

  // click add new raw material button 
  await rawMaterialPage.clickbbtnAddRawMaterial();

  const addRawMaterial = new AddRawMaterialData(page);

  await addRawMaterial.enterItemCode('RM001');
  await addRawMaterial.selectUOM('KG');
  await addRawMaterial.enterDescription('Test Raw Material');
  await addRawMaterial.enterPurchaseLeadTime('5');
  await addRawMaterial.enterQCLeadTime('2');
  await addRawMaterial.clickAddMaterial();
  await addRawMaterial.verifyRawMaterial();

  await page.waitForTimeout(3000);

});

test('TC_002 : Verify Item Code mandatory validation', async ({ page }) => {

  await page.goto('/signin');

  await loginAsAdmin(page);

  const rawMaterialPage = new navigateRawMaterialPage(page);
  // Navigate to Raw Materials
  await rawMaterialPage.clickLblRawMaterial();
  // Move to raw Material page section
  await rawMaterialPage.ClicklblRawMaterials();

  // click add new raw material button 
  await rawMaterialPage.clickbbtnAddRawMaterial();

  const addRawMaterial = new AddRawMaterialData(page);

  await addRawMaterial.selectUOM('KG');
  await addRawMaterial.enterDescription('Test Raw Material');
  await addRawMaterial.enterPurchaseLeadTime('5');
  await addRawMaterial.enterQCLeadTime('2');
  await addRawMaterial.clickAddMaterial();
  await addRawMaterial.verifyItemCodeRequiredError();

});

test('TC_003 : Verify Description mandatory validation', async ({ page }) => {

  await page.goto('/signin');

  const adminLogin = new adminLoginPage(page);

  await loginAsAdmin(page);

  const rawMaterialPage = new navigateRawMaterialPage(page);
  // Navigate to Raw Materials
  await rawMaterialPage.clickLblRawMaterial();
  // Move to raw Material page section
  await rawMaterialPage.ClicklblRawMaterials();

  // click add new raw material button 
  await rawMaterialPage.clickbbtnAddRawMaterial();

  const addRawMaterial = new AddRawMaterialData(page);

  await addRawMaterial.enterItemCode('RM003');
  await addRawMaterial.selectUOM('KG');
  await addRawMaterial.enterPurchaseLeadTime('5');
  await addRawMaterial.enterQCLeadTime('2');
  await addRawMaterial.clickAddMaterial();
  await addRawMaterial.verifyDescriptionRequiredError();

});
test.only('TC_04 : Verify duplicate Item Code', async ({ page }) => {

  await page.goto('/signin');

  const adminLogin = new adminLoginPage(page);

  await loginAsAdmin(page);

  const rawMaterialPage = new navigateRawMaterialPage(page);
  // Navigate to Raw Materials
  await rawMaterialPage.clickLblRawMaterial();
  // Move to raw Material page section
  await rawMaterialPage.ClicklblRawMaterials();

  // click add new raw material button 
  await rawMaterialPage.clickbbtnAddRawMaterial();

  const addRawMaterial = new AddRawMaterialData(page);

  await addRawMaterial.enterItemCode('RM001');
  await addRawMaterial.selectUOM('KG');
  await addRawMaterial.enterDescription('Test Raw Material');
  await addRawMaterial.enterPurchaseLeadTime('5');
  await addRawMaterial.enterQCLeadTime('2');
  await addRawMaterial.clickAddMaterial();
  await addRawMaterial.verifyRawMaterialCreationFailed();

});

test('TC_004: Verify admin can view and change added Raw Material Details', async ({ page }) => {

  await page.goto('/signin');

  await loginAsAdmin(page);

  const rawMaterialPage = new navigateRawMaterialPage(page);
  // Navigate to Raw Materials
  await rawMaterialPage.clickLblRawMaterial();
  // Move to raw Material page section
  await rawMaterialPage.ClicklblRawMaterials();
  await rawMaterialPage.clickRMRow();

  const chnageValue = new changeRawMaterilaDetails(page);
  await chnageValue.verifySaveChangesDisabled();
  await chnageValue.selectPCS();
  await chnageValue.verifySaveChangesEnabled();

  // Save changes
  await chnageValue.clickSaveChanges();
  await chnageValue.verifyRawMaterialUpdatedToast()

  await page.waitForTimeout(4000);
});

test('TC_005: Verify admin can view and deactivate added Raw Material Details', async ({ page }) => {

  await page.goto('/signin');

  await loginAsAdmin(page);

  const rawMaterialPage = new navigateRawMaterialPage(page);
  // Navigate to Raw Materials
  await rawMaterialPage.clickLblRawMaterial();
  // Move to raw Material page section
  await rawMaterialPage.ClicklblRawMaterials();
  await rawMaterialPage.clickRMRow();

  const chnageValue = new changeRawMaterilaDetails(page);
  await chnageValue.clickDeactivateButton();
  await chnageValue.confirmDeactivate();
  await chnageValue.verifyDeactivateSuccessMessage();

  await page.waitForTimeout(4000);
});

test('TC_006: Verify admin cannot deactivate a raw material used in a product', async ({ page }) => {

  await page.goto('/signin');

  await loginAsAdmin(page);

  const rawMaterialPage = new navigateRawMaterialPage(page);
  // Navigate to Raw Materials
  await rawMaterialPage.clickLblRawMaterial();
  // Move to raw Material page section
  await rawMaterialPage.ClicklblRawMaterials();
  await rawMaterialPage.clickCannotDeactivationvalue();

  const chnageValue = new changeRawMaterilaDetails(page);
  await chnageValue.clickDeactivateButton();
  await chnageValue.confirmDeactivate();
  await chnageValue.verifyCannotDeactivationMessage();

  await page.waitForTimeout(4000);
});


