import test from "@playwright/test";
import { loginAdmin, loginAsAdmin } from "../../utils/login";
import { navigationFlow } from "../../pages/navigationFLow/siteNavigation";
import { addSalesOrder } from "../../pages/orderManagementPage/salesOrderPage";
import { viewOrderPage } from "../../pages/orderManagementPage/viewOrderPage";
import { generatePickListPage } from "../../pages/orderManagementPage/pickListPage";
import { addShipmentPage } from "../../pages/orderManagementPage/createShipmentPage";
import { viewShipment } from "../../pages/orderManagementPage/viewShipmentPage";

test("TC_001 : admin can navigvate Order Management workflow without any loading issues", async ({ page }) => {
    await page.goto('/signin');

    await loginAsAdmin(page);
    const customerNavigation = new navigationFlow(page);
    await customerNavigation.navigationOrderManagementAction();
    //  await page.waitForTimeout(2000);
});

test("TC_002 : admin can add New Sales order with valid data", async ({ page }) => {
    await page.goto('/signin');

    await loginAsAdmin(page);
    const customerNavigation = new navigationFlow(page);
    await customerNavigation.orderManagementAction();


    const addNewOrder = new addSalesOrder(page);

    await addNewOrder.addOrder(
        'Office Procurement – October 2026',
        '2026-10-31',
        '100',
        'Shipping and delivery charges for office supplies – LKR 2,500.',
        'Please verify all items and quantities before approving this purchase order.',
        '30',
        '5',
        '2',
        '2026-12-02'
    );

    await page.waitForTimeout(4000);
});
test("TC_003 : admin can move draft order to pending approved status", async ({ page }) => {
    await page.goto('/signin');

    await loginAsAdmin(page);
    const customerNavigation = new navigationFlow(page);
    await customerNavigation.viewOrder(
        'SO-2026-0006'
    );

    const viewOrder = new viewOrderPage(page);
    await viewOrder.pendingapproveOrder(
        "Order move to pending approved process."

    );

    await page.waitForTimeout(4000);
});

test("TC_004 : admin can move pending approval order to approved status", async ({ page }) => {
    await page.goto('/signin');

    await loginAdmin(page);
    const customerNavigation = new navigationFlow(page);
    await customerNavigation.viewOrder(
        'SO-2026-0006'
    );

    const viewOrder = new viewOrderPage(page);
    await viewOrder.approveOrder(
        "Order approved successfully."
    );

    await page.waitForTimeout(4000);

});

test("TC_005 : admin can move approval order to Released status", async ({ page }) => {
    await page.goto('/signin');

    await loginAdmin(page);
    const customerNavigation = new navigationFlow(page);
    await customerNavigation.viewOrder(
        'SO-2026-0006'
    );

    const releaseOrder = new viewOrderPage(page);

    await releaseOrder.releaseOrder(
        "Order released successfully."
    );

    await page.waitForTimeout(4000);

});

test("TC_006 : admin can generate the pickLists", async ({ page }) => {
    await page.goto('/signin');

    await loginAdmin(page);
    const customerNavigation = new navigationFlow(page);
    await customerNavigation.clickPickAction();

    const generatePickList = new generatePickListPage(page);
    await generatePickList.selectWarehouse();
    await page.waitForTimeout(4000);

});

test("TC_007 : admin can assign picker after view Selected lists", async ({ page }) => {
    await page.goto('/signin');

    await loginAdmin(page);
    const customerNavigation = new navigationFlow(page);
    await customerNavigation.viewPickAction(
        'PL-PICK-2026-0005'
    );
    const assignPicker = new generatePickListPage(page);
    await assignPicker.clickPick(
        'Please verify the product quantities before dispatch.'
    );

});

test("TC_008 : admin can create new shipment with valid data", async ({ page }) => {
    await page.goto('/signin');

    await loginAdmin(page);
    const customerNavigation = new navigationFlow(page);
    await customerNavigation.clickShipmentAction();

    const addShipment = new addShipmentPage(page);
    await addShipment.clickSearchReleasedOrder(
        "Express Way",
        "TR_123#_12",
        "2026-11-01",
        "450.00",
        "10",
        "10",
        "10",
        "10",
        "Carefully packed and prepared for dispatch to the customer",
        "5",
        "10",
        "10",
        "10",
        "Contains packed items securely arranged and protected for safe transportation.",
        "39",
        "Please leave the package at the security desk if no one is available to receive it. Thank you for your assistance in ensuring the safe delivery of this shipment."
    );


    await page.waitForTimeout(4000);
});

test.only("TC_009 : admin can change the status of a shipment after viewing it", async ({ page }) => {
    await page.goto('/signin');

    await loginAdmin(page);
    const customerNavigation = new navigationFlow(page);
    await customerNavigation.viewShipmentAction(
        'SHP-2026-0004'
    );
    const viewDetails = new viewShipment(page);
    await viewDetails.updateShipmentStatus(
        'Colombo main warehouse',
        'Shipment has been packed and is ready for dispatch to the customer.'
    );
});


   

