import test from "@playwright/test";
import { loginAsAdmin } from "../../utils/login";
import { navigationFlow } from "../../pages/navigationFLow/siteNavigation";
import { carriersPage } from "../../pages/logistic/carriersPage";
import { transportRate } from "../../pages/logistic/addTranportRatePage";
import { addFeeltVehical } from "../../pages/logistic/addFleetVehicalPage";
import { route } from "../../pages/logistic/addRoutePage";
import { viewRoute } from "../../pages/logistic/viewRoutePage";

test("TC_001 : admin can click Logistic section without any loading issues", async ({ page }) => {
    await page.goto('/signin');

    await loginAsAdmin(page);
    const logisticNavigation = new navigationFlow(page);
    await logisticNavigation.clickLogistics();

    await page.waitForTimeout(2000);

});

test("TC_002 : admin can Add new Carriers section under the Logistic module", async ({ page }) => {
    await page.goto('/signin');

    await loginAsAdmin(page);
    const logisticNavigation = new navigationFlow(page);
    await logisticNavigation.clickCarriers();

    const addNewcarriers = new carriersPage(page);
    await addNewcarriers.enterCarriersDetails(
        "ABC Express Lanka",
        "https://abc.com/track?id=",
        "3",
        "87.5",
        "3"
    );

    await addNewcarriers.enterContacDetails(
        "Kamal Perera",
        "+94 11 234 5678",
        "kamal@dhl.lk"
    );
    await addNewcarriers.enterNote(
        "Reliable carrier for Southern Province deliveries."
    );
    await addNewcarriers.clickSave();
    await addNewcarriers.verifyCarrierCreatedMessage();
    await page.waitForTimeout(2000);

});

test("TC_003 : admin can add transport Rate after view the selected Carriers details ", async ({ page }) => {
    await page.goto('/signin');

    await loginAsAdmin(page);
    const logisticNavigation = new navigationFlow(page);
    await logisticNavigation.viewCarriers();

    const addNewcarriers = new carriersPage(page);
    await addNewcarriers.clickCarriers();

    const transportrate = new transportRate(page);
    await transportrate.addTransportRate(
        10,
        50,
        180.00,
        '2026-10-21',
        '2027-01-21',
        'Standard transport rate for deliveries within the Southern Province.'
    );

    await transportrate.uploadDoc(
        '2027-01-21'
    );

    await page.waitForTimeout(4000);
});

test("TC_004 : admin can add new Fleet vehical ", async ({ page }) => {
    await page.goto('/signin');

    await loginAsAdmin(page);
    const logisticNavigation = new navigationFlow(page);
    await logisticNavigation.clickVehicle();

    const vehicle = new addFeeltVehical(page);

    await vehicle.enterFleetVehicalRegistrationData(
        'CAB-1234',
        'ISUZU',
        '2022',
        '5000',
        '18.5',
        '12',
        'Internal notes about this vehicle'
    );

    await page.waitForTimeout(4000);
});

test("TC_005 : admin can update  added Fleet vehical details ", async ({ page }) => {
    await page.goto('/signin');

    await loginAsAdmin(page);
    const logisticNavigation = new navigationFlow(page);
    await logisticNavigation.clickSelectedVehicle(
        'CAB-1234'
    );
    const vehicle = new addFeeltVehical(page);
    await vehicle.updateFleetVehicle(
        'TOYOTA',
    )
    await page.waitForTimeout(4000);
});

test("TC_005 : admin can change status added Fleet vehical details ", async ({ page }) => {
    await page.goto('/signin');

    await loginAsAdmin(page);
    const logisticNavigation = new navigationFlow(page);
    await logisticNavigation.clickSelectedVehicle(
        'CAB-1234'
    );
    const chngeStatus = new addFeeltVehical(page);
    await chngeStatus.changeStatus('maintenance');
    await page.waitForTimeout(4000);
});

test("TC_006 : admin can create new Route details ", async ({ page }) => {
    await page.goto('/signin');

    await loginAsAdmin(page);
    const logisticNavigation = new navigationFlow(page);
    await logisticNavigation.clickRoute();

    const createRoute = new route(page);

    await createRoute.createNewRoute(
        'Colombo Warehouse',
        '6.9271',
        '79.8612',
        '2026-10-25',
        'Route automation testing'
    );

    await createRoute.addRouteStop(
        'Nadeesha Silva',
        'No. 48, Galle Road',
        'Dehiwala',
        '2026-10-26T14:15',
        '6.9271',
        '79.8612',
        '120.0',
        '0.6',
        'Contact customer before delivery'
    )
    await page.waitForTimeout(4000);
});

test("TC_007 : admin can view created Route details ", async ({ page }) => {
    await page.goto('/signin');

    await loginAsAdmin(page);
    const logisticNavigation = new navigationFlow(page);
    await logisticNavigation.viewRoute();

    const createRoute = new route(page);
    await createRoute.clickRoute();

    const viewDetails = new viewRoute(page);
    await viewDetails.addDeliveredNote(
        'Please verify the quantities and condition of all items upon delivery.'
    );
    await page.waitForTimeout(4000);
    //Route optimized successfully.
});

test("TC_008 : admin can optimize Route after view the added Route details ", async ({ page }) => {
    await page.goto('/signin');

    await loginAsAdmin(page);
    const logisticNavigation = new navigationFlow(page);
    await logisticNavigation.viewRoute();

    const createRoute = new route(page);
    await createRoute.clickRouteDetails();;

    const viewDetails = new viewRoute(page);
    await viewDetails.routeOptimization();

    await page.waitForTimeout(4000);
    //Route marked as in progress.
});

test("TC_008 : admin can started Route after view the added Route details ", async ({ page }) => {
    await page.goto('/signin');

    await loginAsAdmin(page);
    const logisticNavigation = new navigationFlow(page);
    await logisticNavigation.viewRoute();

    const createRoute = new route(page);
    await createRoute.clickRouteDetails();

    const viewDetails = new viewRoute(page);
    await viewDetails.startRoute();

    await page.waitForTimeout(4000);

});

test("TC_008 : admin can Completed the  Route after view the added Route details ", async ({ page }) => {
    await page.goto('/signin');

    await loginAsAdmin(page);
    const logisticNavigation = new navigationFlow(page);
    await logisticNavigation.viewRoute();

    const createRoute = new route(page);
    await createRoute.clickRouteDetails();

    const viewDetails = new viewRoute(page);
    await viewDetails.completedRoute();

    await page.waitForTimeout(4000);

});

