
import { expect, Locator, Page } from "@playwright/test";

export class addCustomer {
    readonly page: Page;

    // Company Information
    readonly txtCompanyName: Locator;
    readonly txtTradeName: Locator;
    readonly ddlCustomerType: Locator;
    readonly txtTaxID: Locator;
    readonly txtCompanyRegNo: Locator;
    readonly txtWebsite: Locator;

    // Billing Address
    readonly txtStreet: Locator;
    readonly txtCity: Locator;
    readonly txtStateProvince: Locator;
    readonly txtPostalCode: Locator;
    readonly txtCountry: Locator;

    // Financial & Credit
    readonly txtCreditTerms: Locator;
    readonly drpCurrency: Locator;
    readonly txtCreditLimit: Locator;
    readonly txtDiscount: Locator;

    readonly chkSameAsBillingAddress: Locator;
    readonly btnAddContact: Locator;

    // Contact Information - Contact 1
    readonly txtFullName: Locator;
    readonly txtTitleRole: Locator;
    readonly txtEmail: Locator;
    readonly txtPhone: Locator;
    readonly txtDepartment: Locator;

    readonly txtNote: Locator;
    readonly btnAddSave:Locator;

    // view added customer 
    readonly rowCustomer : Locator;


    constructor(page: Page) {
        this.page = page;

        // Company Information
        this.txtCompanyName = page.getByPlaceholder("Lanka Retail Holdings");
        this.txtTradeName = page.getByPlaceholder("LRH");
        this.ddlCustomerType = page.getByText("Select type…", { exact: true });
        this.txtTaxID = page.getByPlaceholder("TX-987654321");
        this.txtCompanyRegNo = page.getByPlaceholder("REG-2023-001");
        this.txtWebsite = page.getByPlaceholder("https://company.com");

        // // Billing Address
        this.txtStreet = page.getByPlaceholder("789 Galle Road");
        this.txtCity = page.getByPlaceholder("Colombo").nth(0);
        this.txtStateProvince = page.getByPlaceholder("Western Province").nth(0);
        this.txtPostalCode = page.getByPlaceholder("00300");
        this.txtCountry = page.getByPlaceholder("Sri Lanka").nth(0);

        //Financial & Credit
        this.txtCreditTerms = page.getByText("Select terms…", { exact: true });
        this.drpCurrency = page.locator('button[aria-haspopup="listbox"]').filter({ hasText: "USD" });
        this.txtCreditLimit = page.getByPlaceholder('50000');
        this.txtDiscount = this.txtDiscount = page.locator('input[type="number"][placeholder="5"]');

        this.chkSameAsBillingAddress = page.getByLabel("Same as billing address");

        // Add Contact 
        this.btnAddContact = page.getByRole('button', { name: 'Add Contact', exact: true });

        this.txtFullName = page.getByPlaceholder('Jane Smith');
        this.txtTitleRole = page.getByPlaceholder('Procurement Manager');
        this.txtEmail = page.getByPlaceholder('jane@company.com');
        this.txtPhone = page.getByPlaceholder('+94 11 234 5678');
        this.txtDepartment = page.getByPlaceholder('Finance');

        this.txtNote = page.getByPlaceholder('Key account — escalate disputes to sales manager');

        this.btnAddSave = page.getByRole('button',{name:'Save Customer',exact:true});

        this.rowCustomer = page.locator('tbody tr').filter({ hasText: 'MacTiles Holdings' });
    }

    async companyInformation(
        companyName: string,
        tradeName: string,
        customerType: string,
        taxID: string,
        companyRegNo: string,
        website: string
    ) {
        await this.txtCompanyName.fill(companyName);
        await this.txtTradeName.fill(tradeName);

        await this.ddlCustomerType.click();
        await this.page.getByText(customerType, { exact: true }).click();

        await this.txtTaxID.fill(taxID);
        await this.txtCompanyRegNo.fill(companyRegNo);
        await this.txtWebsite.fill(website);
    }

    async billingAddress(
        street: string,
        city: string,
        stateProvince: string,
        postalCode: string,
        country: string
    ) {
        await this.txtStreet.fill(street);
        await this.txtCity.fill(city);
        await this.txtStateProvince.fill(stateProvince);
        await this.txtPostalCode.fill(postalCode);
        await this.txtCountry.fill(country);
    }

    async addFinancialCredit(
        creditTerms: string,
        currency: string,
        creditLimit: string,
        discount: string
    ) {
        await this.txtCreditTerms.click();
        await this.page.getByText(creditTerms, { exact: true }).click();
        await this.drpCurrency.click();
        await this.page.getByText(currency, { exact: true }).click();
        await this.txtCreditLimit.fill(creditLimit);
        await this.txtDiscount.fill(discount);
    }
    async clickSameAsBillingAddress() {
        await this.chkSameAsBillingAddress.check();
    }

    async ClickAddContact() {
        await this.btnAddContact.click();
    }

    async contactInformation(
        fullName: string,
        titleRole: string,
        email: string,
        phone: string,
        department: string
    ) {
        await this.txtFullName.fill(fullName);
        await this.txtTitleRole.fill(titleRole);
        await this.txtEmail.fill(email);
        await this.txtPhone.fill(phone);
        await this.txtDepartment.fill(department);
    }

    async addNote(
        note:string,
    ){
        await this.txtNote.fill(note);
    }

    async clickAddSave(){
        await this.btnAddSave.click();
    }

    async verifyCarrierCreatedMessage() {
        await expect(
            this.page.locator('.Toastify__toast--success')
        ).toContainText(`Customer saved. Redirecting…`);

    }
    async clickCustomer () {
        const targetRow = this.page.locator('tbody tr').filter({
            hasText: 'MacTiles Holdings'
        });

        await expect(targetRow).toBeVisible();
        await targetRow.click();
    }
}
