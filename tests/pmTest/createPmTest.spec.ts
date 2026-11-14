import test from "@playwright/test";
import { navigationFlow } from "../../pages/navigationFLow/siteNavigation";
import { loginAsAdmin } from "../../utils/login";
import { addNewProject } from "../../pages/projectManagementPage/createPmpage";
import { addNewPhase } from "../../pages/projectManagementPage/createphasePage";
import { addNewMilestone } from "../../pages/projectManagementPage/addMilestonesPage";
import { addNewTask } from "../../pages/projectManagementPage/addTaskPage";
import { addBudget } from "../../pages/projectManagementPage/addBudgetPage";
import { addLabour } from "../../pages/projectManagementPage/addLabourPage";
import { addMaterialIssue } from "../../pages/projectManagementPage/addMaterialPage";
import { addDocument } from "../../pages/projectManagementPage/addDocumentPage";
import { labourRate } from "../../pages/projectManagementPage/addLabourRatesPage";

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

    const addMilestone = new addNewMilestone(page);
    await addMilestone.addMils();

    await page.waitForTimeout(4000);

})

test('TC_006 : Verify that an admin can achived the added Milstone', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);
    const posPage = new navigationFlow(page);
    await posPage.addNewphases('PRJ-2026-0007');

    const addMilestone = new addNewMilestone(page);
    await addMilestone.achiveMile(
        'Project Planning'
    );
    await page.waitForTimeout(4000);
})

test('TC_007: Verify that an admin can add a new task', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);
    const posPage = new navigationFlow(page);
    await posPage.addNewphases('PRJ-2026-0007');

    const addTaskPage = new addNewTask(page);
    await addTaskPage.addTask(
        'Develop User Registration Functionality',
        'Development Phase',
        'Yasasri Banuka Dias Wimalaweera',
        'High',
        'In Progress',
        '8',
        '50',
        'Complete development tasks and verify project requirements.'
    );

});

test('TC_008: Verify that an admin can add a new sub task after click the created Task + icon', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);
    const posPage = new navigationFlow(page);
    await posPage.addNewphases('PRJ-2026-0007');

    const addTaskPage = new addNewTask(page);
    await addTaskPage.clickAddSubtask(
        'TSK-0001',
        'Sub Task : Add Login function Automation',
        'Development Phase',
        'Praveen Jayaweera',
        'High',
        'In Progress',
        '8',
        '20',
        'Complete development tasks and verify project requirements.'
    );

});



test('TC_009: Verify that an admin can add a new dependency by clicking the Task Dependencies icon.', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);
    const posPage = new navigationFlow(page);
    await posPage.addNewphases('PRJ-2026-0007');

    const addTaskPage = new addNewTask(page);
    await addTaskPage.addDependencies(
        'TSK-0001',
        'TSK-0002 · Sub Task : Add Login function Automation'
    );

});

test('TC_010: Verify that an admin can add a new Budget.', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);
    const posPage = new navigationFlow(page);
    await posPage.addNewphases('PRJ-2026-0007');

    const addNewBudget = new addBudget(page);
    await addNewBudget.addNewBudget();

});

test('TC_011: Verify that an admin cannot add a new log of hours to an inactive project. [Manual Override]', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);
    const posPage = new navigationFlow(page);
    await posPage.addNewphases('PRJ-2026-0007');

    const addNewLabour= new addLabour(page);
     await addNewLabour.addaLabourDetials();

     await page.waitForTimeout(4000);

});

test('TC_012: Verify that an admin cannot add a new log of hours to an inactive project. [From rate master]', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);
    const posPage = new navigationFlow(page);
    await posPage.addNewphases('PRJ-2026-0007');

    const addNewLabour= new addLabour(page);
     await addNewLabour.addLabourDetials();

     await page.waitForTimeout(4000);

});

test('TC_013: Verify that an admin can add a new material issue ', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);
    const posPage = new navigationFlow(page);
    await posPage.addNewphases('PRJ-2026-0007');

    const addNewIssue= new addMaterialIssue(page);
     await addNewIssue.addNewMaterialIssue();

     await page.waitForTimeout(4000);

});

test('TC_014: Verify that an admin can upload a new Documents ', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);
    const posPage = new navigationFlow(page);
    await posPage.addNewphases('PRJ-2026-0007');

    const addDoc = new addDocument(page);
    await addDoc.addNewDocument();

     await page.waitForTimeout(4000);

});

test.only('TC_015: Verify that an admin can new Labour Rates ', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);
    const posPage = new navigationFlow(page);
    await posPage.clickLabourRate();

    const addRate = new labourRate(page);
    await addRate.addLabourRate();

     await page.waitForTimeout(4000);

});


