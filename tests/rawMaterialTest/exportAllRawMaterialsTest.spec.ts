import { test } from '@playwright/test';
import { navigateRawMaterialPage } from '../../pages/rawMaterials/navigateRawMaterialPage';
import { adminLoginPage } from '../../pages/adminLoginPage/adminLoginPage';

test('TC_004 : Verify that an admin can successfully Import the new Raw Material with valid details.', async ({ page }) => {

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
  await rawMaterialPage.clickExport();

  await page.waitForTimeout(4000);
});