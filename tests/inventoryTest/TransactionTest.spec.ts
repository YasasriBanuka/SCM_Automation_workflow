import test from "@playwright/test";
import { navigationFlow } from "../../pages/navigationFLow/siteNavigation";
import { loginAsAdmin } from "../../utils/login";
import { addNewStockPage } from "../../pages/inventoryPage/addNewStockPage";
import { inventoryReorderPage } from "../../pages/inventoryPage/inventoryReorderPage";
import { goodsReceiptPage } from "../../pages/inventoryPage/goodsReceiptPage";
import { cycleCountPage } from "../../pages/inventoryPage/cycleCountPage";

test("TC_001 : add new Post Transcation", async ({ page }) => {
    await page.goto('/signin');

    await loginAsAdmin(page);
    const inventoryNavigation = new navigationFlow(page);
    await inventoryNavigation.clickInventory();
    // Add assertions here to verify that the Stock Dashboard page is displayed

    const addNewStock = new addNewStockPage(page);
    await addNewStock.selectTransactionType();
    await addNewStock.selectItem('EL_001');
    await addNewStock.selectWarehouse();
    await addNewStock.getCurrentAvailable();
    await addNewStock.enterQuantity('1000');
    await addNewStock.enterUnitCost('200');
    await addNewStock.selectPos('PO-2026-0003'); // Wait for 2 seconds to observe the navigation PO-2026-0003
    await addNewStock.enterNotes('Stock received for testing');
    await addNewStock.saveTransaction();

    await page.waitForTimeout(2000);

});

test("TC_002 : add new Goods Receipt with valid data", async ({ page }) => {
    await page.goto('/signin');

    await loginAsAdmin(page);
    const inventoryNavigation = new navigationFlow(page);
    await inventoryNavigation.clickGoodsReceipt();

    const goodsReceipt = new goodsReceiptPage(page);
    await goodsReceipt.selectPO();
    await goodsReceipt.selectWH();
    await goodsReceipt.enterData(
        '1000',
        'Batch-001',
        '2026-12-31'
    );
    await goodsReceipt.verifyToastMessage();


    await page.waitForTimeout(2000);

});

test.only("TC_003 : Verify cycle count with valid data", async ({ page }) => {
    await page.goto('/signin');

    await loginAsAdmin(page);
    const inventoryNavigation = new navigationFlow(page);
    await inventoryNavigation.clickCycleCount();

    const cycleCount = new cycleCountPage(page);
    await cycleCount.filterByWarehouse();
    await cycleCount.enterCountedQuantity('90');
    await cycleCount.selectReason('Audit Correction');

 
    await page.waitForTimeout(4000);

});