import { test } from '@playwright/test';
import { navigateRawMaterialPage } from '../../pages/rawMaterials/navigateRawMaterialPage';
import { adminLoginPage } from '../../pages/adminLoginPage/adminLoginPage';
import { loginAsAdmin } from '../../utils/login';

test('TC_004 : Verify that an admin can successfully Import the new Raw Material with valid details.', async ({ page }) => {

  await page.goto('/signin');

  await loginAsAdmin(page);

  const rawMaterialPage = new navigateRawMaterialPage(page);
  // Navigate to Raw Materials
  await rawMaterialPage.clickLblRawMaterial();
  // Move to raw Material page section
  await rawMaterialPage.ClicklblRawMaterials();
  await rawMaterialPage.clickExport();

  await page.waitForTimeout(4000);
});