import test from "@playwright/test";
import { navigationFlow } from "../../pages/navigationFLow/siteNavigation";
import { loginAsAdmin } from "../../utils/login";
import { addNewTeam } from "../../pages/staffTaskPage/createTeamPage";
import { addNewStaffTask } from "../../pages/staffTaskPage/createStaffTaskPage";
import { viewNewStaffTask } from "../../pages/staffTaskPage/viewStaffTaskPage";

test('TC_001 : Verify that an admin user can navigate to the Staff Task section without any loading issues ', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);
    const posPage = new navigationFlow(page);
    await posPage.navigateStaffTask();
});
test('TC_002 : Verify that an admin user can create new team ', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);
    const posPage = new navigationFlow(page);
    await posPage.navigateStaffTask();

    const addTeam = new addNewTeam(page);
    await addTeam.createTeam();

    await page.waitForTimeout(4000);
});
test('TC_003 : Verify that an admin user can create new task', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);
    const posPage = new navigationFlow(page);
    await posPage. createStaffTask();

    const addStaffTask = new addNewStaffTask(page);
    await addStaffTask.createTask();

    await page.waitForTimeout(4000);
});
test('TC_004 : Verify that an admin user can update selected task details after view', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);
    const posPage = new navigationFlow(page);
    await posPage.viewTask(
        'TASK-2026-0016'
    );

    const viewTask = new viewNewStaffTask(page);
    await viewTask.updateTask();

    await page.waitForTimeout(4000);
});

test('TC_005 : Verify that an admin user can completed the pending tasks', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);
    const posPage = new navigationFlow(page);
    await posPage.viewTask(
        'TASK-2026-0016'
    );
    const viewTask = new viewNewStaffTask(page);
    await viewTask.pendingTask();

});


