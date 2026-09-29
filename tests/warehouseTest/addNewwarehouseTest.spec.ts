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


  await page.waitForTimeout(4000);
});
test.only('TC_002 : Verify that an Admin can create a Zone for an existing warehouse using valid details.', async ({ page }) => {

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

  await page.waitForTimeout(4000);
});


