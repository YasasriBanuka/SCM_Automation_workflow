import test from "@playwright/test";
import { navigationFlow } from "../../pages/navigationFLow/siteNavigation";
import { loginAsAdmin } from "../../utils/login";
import { addMrp } from "../../pages/mrp/createMrpPage";


test('TC_001 : Verify that an admin user can navigate to the MRP section without any loading issues ', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);

    const posPage = new navigationFlow(page);
    await posPage.clickMrp();
})

test.only('TC_001 : Verify that an admin user can create new MRP Runs ', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);

    const posPage = new navigationFlow(page);
    await posPage.createMrp();

    const addNewMrp = new addMrp(page);
    await addNewMrp.createMrp();

})