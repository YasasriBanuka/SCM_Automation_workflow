import test from "@playwright/test";
import { navigationFlow } from "../../pages/navigationFLow/siteNavigation";
import { loginAsAdmin } from "../../utils/login";
import { addNewProject } from "../../pages/projectManagementPage/createPmpage";
import { addNewPhase } from "../../pages/projectManagementPage/createphasePage";
import { addNewMilestone } from "../../pages/projectManagementPage/addMilestonesPage";

test('TC_001 : Verify that an admin user can navigate to the PM section without any loading issues ', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);
    const posPage = new navigationFlow(page);
    await posPage.clickproject();

})

test('TC_002 : Verify that an admin can create new project ', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);
    const posPage = new navigationFlow(page);
    await posPage.createProject();

    const createProject = new addNewProject(page);
    await createProject.createProject();
})

test('TC_003 : Verify that an admin can create new phases ', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);
    const posPage = new navigationFlow(page);
    await posPage.addNewphases('PRJ-2026-0007');

    const addPhase = new addNewPhase(page);
    await addPhase.createPhase('In Progress');

    await page.waitForTimeout(4000);

}) 

test('TC_004 : Verify that an admin can edit the phases stage ', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);
    const posPage = new navigationFlow(page);
    await posPage.addNewphases('PRJ-2026-0007');

    const edit = new addNewPhase(page);
    await edit.editPhase(
        'Development Phase',
        'In Progress'
    )
    await page.waitForTimeout(4000);

}) 

test('TC_005 : Verify that an admin can add the new Milstone', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);
    const posPage = new navigationFlow(page);
    await posPage.addNewphases('PRJ-2026-0007');

    const addMilestone = new addNewMilestone (page);
    await addMilestone.addMils();

    await page.waitForTimeout(4000);

}) 

test('TC_006 : Verify that an admin can achived the added Milstone', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);
    const posPage = new navigationFlow(page);
    await posPage.addNewphases('PRJ-2026-0007');

    const addMilestone = new addNewMilestone (page);
    await addMilestone.achiveMile(
        'Project Planning'
    ); 

    await page.waitForTimeout(4000);

}) 