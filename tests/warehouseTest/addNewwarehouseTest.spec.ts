import { test } from '@playwright/test';
import { loginAsAdmin } from '../../utils/login';
import { navigationFlow } from '../../pages/navigationFLow/siteNavigation';
import { addWarehouse } from '../../pages/warehousePage/addWarehousePage';
import { addNewZone } from '../../pages/warehousePage/addZonePage';


test('TC_001 : Verify that an admin can successfully add new warehouse with valid details.', async ({ page }) => {

  await page.goto('/signin');

  await loginAsAdmin(page);

  const addwarehouse = new navigationFlow(page);
  await addwarehouse.navigateToAddWarehouse();

  const addNewHouse = new addWarehouse(page);
  await addNewHouse.enterWarehouseCode('WH_010');
  await addNewHouse.enterWarehouseName('Galle WareHouse');
  await addNewHouse.enterWarehouseLocation('No12/A, Gintotta Galle Road');
  await addNewHouse.clickAddButton();
  await addNewHouse.verifyWarehouseCreatedToast();
  await addNewHouse.verifyWarehouseSavedToast();

});
test('TC_002 : Verify that an Admin can create a Zone for an existing warehouse using valid details.', async ({ page }) => {

  await page.goto('/signin');

  await loginAsAdmin(page);

  const addwarehouse = new navigationFlow(page);
  await addwarehouse.viewAddWarehouse();
  await addwarehouse.selectWarehouse('Galle WareHouse');

  const addnewZone = new addNewZone(page);
  await addnewZone.AddZoneDetails(
    'Z_002',
    'Colombo Zone',
    '2'
  );
  await addnewZone.verifyZoneCreatedToast();

});

test('TC_003 : Verify that an Admin can create a Zone and bin for an existing warehouse using valid details.', async ({ page }) => {

  await page.goto('/signin');

  await loginAsAdmin(page);

  const addwarehouse = new navigationFlow(page);
  await addwarehouse.viewAddWarehouse();
  await addwarehouse.selectWarehouse('Galle WareHouse');

  const addnewZone = new addNewZone(page);

  await addnewZone.clickBin(
    'Bin_002',
    'Sub Storage Bin'
  );

  await addnewZone.verifyBinCreatedToast();
});

test('TC_004 : Verify that an Admin can add stock to a selected bin of an existing warehouse using valid details.', async ({ page }) => {

  await page.goto('/signin');

  await loginAsAdmin(page);

  const addwarehouse = new navigationFlow(page);
  await addwarehouse.viewAddWarehouse();
  await addwarehouse.selectWarehouse('Galle WareHouse');

  const addnewZone = new addNewZone(page);
  await addnewZone.viewStock();
  await addnewZone.searchAndSelectItem('EL_001[BLENDER]');

  await addnewZone.addStockDetails(
    '10',
    'BATCH-2026-001',
    'LOT-001',
    '2026-10-04',
    '1500.00'
  );

  await page.waitForTimeout(4000);
});

test('TC_005 : Verify that an Admin can update selected warehouse details with valid details ', async ({ page }) => {

  await page.goto('/signin');

  await loginAsAdmin(page);

  const addwarehouse = new navigationFlow(page);
  await addwarehouse.viewAddWarehouse();

  const addNewHouse = new addWarehouse(page);
  await addNewHouse.updateWarehouse('Galle WareHouse');
  await addNewHouse.enterWarehouseLocation('No12/A, Gintotta Galle Road, Sri Lanka');
  await addNewHouse.clickSaveChangesButton();
  await addNewHouse.verifyWarehouseUpdatedMessage();

  await page.waitForTimeout(4000);
});


test('TC_005 : Verify that an Admin can deleted selected warehouse details', async ({ page }) => {

  await page.goto('/signin');

  await loginAsAdmin(page);

  const addwarehouse = new navigationFlow(page);
  await addwarehouse.viewAddWarehouse();

  const addNewHouse = new addWarehouse(page);
  await addNewHouse.deleteWarehouse('Matara WareHouse');
  await addNewHouse.addComment('Warehouse is no longer in use');
  await addNewHouse.clickDeactivateButton();
  await addNewHouse.verifyWarehouseDeletedMessage();

  await page.waitForTimeout(4000);
});