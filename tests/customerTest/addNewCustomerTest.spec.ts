import { test } from "@playwright/test";
import { navigationFlow } from "../../pages/navigationFLow/siteNavigation";
import { loginAdmin, loginAsAdmin } from "../../utils/login";
import { addCustomer } from "../../pages/customerPage/addNewCustomerPage";
import { updateCustomer } from "../../pages/customerPage/viewCustomerDetailsPage";

test("TC_001 : admin can click Customer workflow without any loading issues", async ({ page }) => {
    await page.goto('/signin');

    await loginAsAdmin(page);
    const customerNavigation = new navigationFlow(page);
    await customerNavigation.clickCustomer();

    await page.waitForTimeout(2000);
});

test("TC_002 : admin can add new Customer with valid details", async ({ page }) => {
    await page.goto('/signin');

    await loginAsAdmin(page);
    const customerNavigation= new navigationFlow(page);
    await customerNavigation.AddCustomer();

    const addNewCustomer = new addCustomer(page);

    await addNewCustomer.companyInformation(
        "MacTiles Holdings",
        "LRH",
        "B2B",
        "TX-987654389",
        "REG-2023-01",
        "https://mactiles.com"
    );

    await addNewCustomer.billingAddress(
        "789 Galle Road",
        "Galle",
        "Southern Province",
        "30000",
        "Sri Lanka"
    );

    await addNewCustomer.addFinancialCredit(
        "Net 30",
        "LKR",
        "50000",
        "5"
    );

    await addNewCustomer.clickSameAsBillingAddress();

    await addNewCustomer.ClickAddContact();

    await addNewCustomer.contactInformation(
        "Banuka Wimalaweera",
        "Project Manager",
        "banukadias@gmail.com",
        "0768878781",
        "Project Management"
    );

    await addNewCustomer.addNote(
        'Contact the customer before processing large orders.'
    );
    await addNewCustomer.clickAddSave();
    await addNewCustomer.verifyCarrierCreatedMessage();
    
    // /Customer saved. Redirecting…
    await page.waitForTimeout(2000); 

});

test("TC_003 : The admin can move their own customer to the Pending Approval stage.", async ({ page }) => {
    await page.goto('/signin');

    await loginAsAdmin(page);
    const customerNavigation = new navigationFlow(page);
    await customerNavigation.clickCustomer();

    const viewCustomer = new addCustomer(page);
    await viewCustomer.clickCustomer();

    const updateCustomerStatus = new updateCustomer(page);
    await updateCustomerStatus.clickMoveToPendingApproval(
        'Candidate profile submitted for review and approval by the Talent Acquisition team.'
    )
    await page.waitForTimeout(2000);   
});

test("TC_004 : The admin can upload documents afet view the customer details", async ({ page }) => {
    await page.goto('/signin');

    await loginAsAdmin(page);
    const customerNavigation = new navigationFlow(page);
    await customerNavigation.clickCustomer();

    const viewCustomer = new addCustomer(page);
    await viewCustomer.clickCustomer();

    const addPriceList = new updateCustomer(page);
    await addPriceList.addDocuments(
        '2026-10-26'
    );
});

test("TC_005 : The admin can assign a price list to their own customers", async ({ page }) => {
    await page.goto('/signin');

    await loginAsAdmin(page);
    const customerNavigation = new navigationFlow(page);
    await customerNavigation.clickCustomer();

    const viewCustomer = new addCustomer(page);
    await viewCustomer.clickCustomer();

    const approveCustomer = new updateCustomer(page);
    await approveCustomer.clickApproval(
        'Approval Pass'
    )
});

test("TC_005 : The another admin can approve pending approval customers", async ({ page }) => {
    await page.goto('/signin');

    await loginAdmin(page);

    const customerNavigation = new navigationFlow(page);
    await customerNavigation.clickCustomer();

    const viewCustomer = new addCustomer(page);
    await viewCustomer.clickCustomer();

    const approveCustomer = new updateCustomer(page);
    await approveCustomer.approvalSuccess(
        'Approval Pass'
    ) 

});
