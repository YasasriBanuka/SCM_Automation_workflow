import { test } from '@playwright/test';
import { navigateRawMaterialPage } from '../../pages/rawMaterials/navigateRawMaterialPage';
import { adminLoginPage } from '../../pages/adminLoginPage/adminLoginPage';
import { importRawMaterials } from '../../pages/rawMaterials/ImportRawMaterialDataPage';
import { verifyImportData } from '../../pages/rawMaterials/VerifyImportDataPage';


test('TC_001 : Verify that an admin can successfully Import the new Raw Material with valid details.', async ({ page }) => {

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
  await rawMaterialPage.clickImport();

  const importRM = new importRawMaterials(page);
  await importRM.clickDownloadTemplate();
  await importRM.verifyUploadPreviewDisabled();
  await importRM.uploadExcelFile();
  await importRM.verifyUploadPreviewEnabled();
  await importRM.clickUpdateExistingRecords();
  await importRM.verifyUpdateExistingRecordsChecked();
  await importRM.clickUploadPreview();

  const imprtRMdata = new verifyImportData(page);
  await imprtRMdata.clickImportOneRow();
  await imprtRMdata.verifyCheckBoxMessageImport();
  await imprtRMdata.clickDone();

  await page.waitForTimeout(4000);
});

test('TC_002 : Verify existing Raw Material is updated when Update Existing Records is "ON"', async ({ page }) => {

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
  await rawMaterialPage.clickImport();

  const importRM = new importRawMaterials(page);
  await importRM.verifyUploadPreviewDisabled();
  await importRM.uploadExcelFile();
  await importRM.verifyUploadPreviewEnabled();
  await importRM.clickUpdateExistingRecords();
  await importRM.verifyUpdateExistingRecordsChecked();
  await importRM.clickUploadPreview();

  const imprtRMdata = new verifyImportData(page);
  await imprtRMdata.clickImportOneRow();
  await imprtRMdata.verifyCheckBoxMessageImport();
  await imprtRMdata.clickDone();

  await page.waitForTimeout(4000);
});

test('TC_003 : Verify existing Raw Material is updated when Update Existing Records is "OFF"', async ({ page }) => {

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
  await rawMaterialPage.clickImport();

  const importRM = new importRawMaterials(page);
  await importRM.verifyUploadPreviewDisabled();
  await importRM.uploadExcelFile();
  await importRM.verifyUploadPreviewEnabled();
  await importRM.clickUploadPreview();

  const imprtRMdata = new verifyImportData(page);
  await imprtRMdata.clickImportOneRow();
  await imprtRMdata.verifyDuplicateRawMaterialError();
  await imprtRMdata.clickDone();

  await page.waitForTimeout(4000);
});