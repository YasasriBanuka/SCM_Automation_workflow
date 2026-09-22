import { test } from '@playwright/test';
import { navigateRawMaterialPage } from '../../pages/rawMaterials/navigateRawMaterialPage';
import { adminLoginPage } from '../../pages/adminLoginPage/adminLoginPage';
import { AddRawMaterialData } from '../../pages/rawMaterials/addRawMaterialData';


test('TC_001 : Verify that an admin user can successfully create a new Raw Material with valid details.', async ({ page }) => {

  await page.goto('/signin');

  const adminLogin = new adminLoginPage(page);
  await adminLogin.enterUsername('admin.operations@companydemo.com');
  await adminLogin.enterPassword('Admin@2026!');
  await adminLogin.selectBranch();
  await adminLogin.clickcheckbox();
  await adminLogin.clickLogin();

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

  const adminLogin = new adminLoginPage(page);
  await adminLogin.enterUsername('admin.operations@companydemo.com');
  await adminLogin.enterPassword('Admin@2026!');
  await adminLogin.selectBranch();
  await adminLogin.clickcheckbox();
  await adminLogin.clickLogin();

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
  await adminLogin.enterUsername('admin.operations@companydemo.com');
  await adminLogin.enterPassword('Admin@2026!');
  await adminLogin.selectBranch();
  await adminLogin.clickcheckbox();
  await adminLogin.clickLogin();

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
  await adminLogin.enterUsername('admin.operations@companydemo.com');
  await adminLogin.enterPassword('Admin@2026!');
  await adminLogin.selectBranch();
  await adminLogin.clickcheckbox();
  await adminLogin.clickLogin();

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





