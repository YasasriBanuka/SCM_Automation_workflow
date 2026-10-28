import test from "@playwright/test";
import { loginAsAdmin } from "../../utils/login";
import { navigationFlow } from "../../pages/navigationFLow/siteNavigation";
import { addComplaints } from "../../pages/complaintsPage/addComplaintsPage";
import { viewComplaints } from "../../pages/complaintsPage/viewComplaintsPage";
import { createLink } from "../../pages/complaintsPage/createPortalLinkPage";

test("TC_001 : admin can click Complaints & Issue Management workflow without any loading issues", async ({ page }) => {
    await page.goto('/signin');

    await loginAsAdmin(page);
    const customerNavigation = new navigationFlow(page);
    await customerNavigation.addNewComplaints();
  //  await page.waitForTimeout(2000);
});

test("TC_002 : admin can add new Complaints", async ({ page }) => {
    await page.goto('/signin');

    await loginAsAdmin(page);
    const customerNavigation = new navigationFlow(page);
    await customerNavigation.NewComplaints();

    const addComplaint = new addComplaints(page);
    await addComplaint.addComplaints(
        'Supplier',
        'Late Delivery',
        'The delivery was delayed and did not arrive on the expected delivery date',
        'High'
    )
    //await page.waitForTimeout(2000);
});

test("TC_003 : Admin can assign branch users after viewing the created complaints.", async ({ page }) => {
    await page.goto('/signin');

    await loginAsAdmin(page);
    const customerNavigation = new navigationFlow(page);
    await customerNavigation.clickSelectedComplaint(
        'CMP-2026-0013'
    );
    const viewComplaint = new viewComplaints(page);
    await viewComplaint.assignUser(
        'The delivery was delayed and did not arrive on the expected date.'
    );
    //await page.waitForTimeout(2000);
});

test("TC_004 : Admin can click start work button after viewing the created complaints.", async ({ page }) => {
    await page.goto('/signin');

    await loginAsAdmin(page);
    const customerNavigation = new navigationFlow(page);
    await customerNavigation.clickSelectedComplaint(
        'CMP-2026-0013'
    );

    const viewComplaint = new viewComplaints(page);
    await viewComplaint.clickStartWork();

    //await page.waitForTimeout(2000);
});

test("TC_005 : Admin can add internal note after viewing the created complaints.", async ({ page }) => {
    await page.goto('/signin');

    await loginAsAdmin(page);
    const customerNavigation = new navigationFlow(page);
    await customerNavigation.clickSelectedComplaint(
        'CMP-2026-0013'
    );
    const viewComplaint = new viewComplaints(page);
    await viewComplaint.addNote(
        'Complaint reviewed by admin. Follow-up action is required'
    );

   // await page.waitForTimeout(2000);
});

test("TC_006 : Verify that the admin can create new complaint portal link after navigate to the section.", async ({ page }) => {
    await page.goto('/signin');

    await loginAsAdmin(page);
    const customerNavigation = new navigationFlow(page);
    await customerNavigation.clickPortalLinks();

   // await page.waitForTimeout(2000);
});

test("TC_007 : Verify that the admin can create new complaint portal link ", async ({ page }) => {
    await page.goto('/signin');

    await loginAsAdmin(page);
    const customerNavigation = new navigationFlow(page);
    await customerNavigation.clickPortalLinks();

    const addComplaint = new addComplaints(page);
    await addComplaint.createComplaintsLink(
        'Supplier',
    )

    const comLink = new createLink(page);
    await comLink.createComLink(
        'banukadias5+qa@gmail.com',
        '13',
        '1'
    )

    //await page.waitForTimeout(2000);
});
