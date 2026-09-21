import { Page, Locator, expect } from '@playwright/test';

export class addNewSupplier {

    readonly page: Page;
    //  Company Information Locator Declarations
    readonly txtcompanyNameInput: Locator;
    readonly txtTradeName: Locator;
    readonly drpSupplierCategory: Locator;
    readonly drpSupplierOption: Locator;
    readonly txtSubCategory: Locator;
    readonly txtTaxID: Locator;
    readonly txtCompanyRegistrationNo: Locator;
    readonly txtWebsitelink: Locator;

    //  Address section Locator Declarations
    readonly txtAddress: Locator;
    readonly txtCity: Locator;
    readonly txtState: Locator;
    readonly txtpostalCode: Locator;
    readonly txtCountry: Locator;

    // Contacts section Locator Declarations
    readonly txtName: Locator;
    readonly txtTitle: Locator;
    readonly txtEmail: Locator;
    readonly txtNumber: Locator;
    readonly btnAddContact: Locator;
    readonly btnContactRemove: Locator;

    //Add certificate Locator Declaration
    readonly btnAddCertificate: Locator;
    readonly txtCertificationName: Locator;
    readonly txtIssuingBody: Locator;
    readonly txtIssueDate: Locator;
    readonly txtExpireDate: Locator;
    readonly btnRemoveCertificate: Locator;

    //Add Pricing & Financial section locator Declaration
    readonly drppaymentTeam: Locator;
    readonly paymentTeamOption: Locator;
    readonly drpCurrency: Locator;
    readonly currencyOption: Locator;
    readonly txtBankName: Locator;
    readonly txtAccountNumber: Locator;
    readonly txtInternalNote: Locator;

    //click the save supplier 
    readonly btnSaveSupplier: Locator;

    // Add supplier verifcation 
    readonly toastSuccessMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        // Constructor - Initialize Locators [Company Information Locator Declarations]
        this.txtcompanyNameInput = page.getByPlaceholder('Acme Corporation', { exact: true });
        this.txtTradeName = page.getByPlaceholder('Acme', { exact: true });
        this.drpSupplierCategory = page.getByRole('button', { name: 'Select category…' });
        this.drpSupplierOption = page.getByRole('option', { name: 'Packaging' });
        this.txtSubCategory = page.getByPlaceholder('e.g. Corrugated Boxes');
        this.txtTaxID = page.getByPlaceholder('TX-123456789');
        this.txtCompanyRegistrationNo = page.getByPlaceholder('REG-2024-XXXX');
        this.txtWebsitelink = page.getByPlaceholder('https://example.com');

        // Constructor - Initialize Locators [Address Locator Declarations]
        this.txtAddress = page.getByPlaceholder('123 Main Street');
        this.txtCity = page.getByPlaceholder('Colombo');
        this.txtState = page.getByPlaceholder('Western Province');
        this.txtpostalCode = page.getByPlaceholder('00100');
        this.txtCountry = page.getByPlaceholder('Sri Lanka');

        //Constructor - Initiialize Locators [Contacts Locator Declarations]
        this.txtName = page.getByPlaceholder('Jane Smith');
        this.txtTitle = page.getByPlaceholder('Procurement Manager');
        this.txtEmail = page.getByPlaceholder('jane@company.com');
        this.txtNumber = page.getByPlaceholder('+1 555 000 0000');
        this.btnAddContact = page.getByRole('button', { name: 'Add Contact' });
        this.btnContactRemove = page.getByRole('button', { name: 'Remove' }).last();

        //Constructor - Initialize Loators [Add Certification section]
        this.btnAddCertificate = page.getByRole('button', { name: 'Add Certification' });
        this.txtCertificationName = page.getByPlaceholder('ISO 9001:2015');
        this.txtIssuingBody = page.getByPlaceholder('Bureau Veritas');
        this.txtIssueDate = page.locator('input[type="date"]').first();
        this.txtExpireDate = page.locator('input[type="date"]').nth(1);
        this.btnRemoveCertificate = page.getByRole('button', { name: 'Remove' }).last();

        //constructor - Initialize Loators [Pricing & Financial section]
        this.drppaymentTeam = page.getByRole('button', { name: 'Select terms…' });
        this.paymentTeamOption = page.getByRole('option', { name: 'Net 30' });
        this.drpCurrency = page.getByRole('button', { name: 'Select currency…' });
        this.currencyOption = page.getByRole('option', { name: 'LKR' });
        this.txtBankName = page.getByPlaceholder('Commercial Bank');
        this.txtAccountNumber = page.getByPlaceholder('1234567890');
        this.txtInternalNote = page.getByPlaceholder('Any notes about this supplier…');

        //constructor - Initialize Loators [Save supplier btn]
        this.btnSaveSupplier = page.getByRole('button', { name: 'Save Supplier' });

        this.toastSuccessMessage = page.getByRole('alert');

    }
    async enterCompanyInformation(
        companyName: string,
        tradeName: string,
        subCategory: string,
        taxID: string,
        registrationNo: string,
        websiteLink: string
    ) {
        await this.txtcompanyNameInput.fill(companyName);
        await this.txtTradeName.fill(tradeName);
        await this.drpSupplierCategory.click();
        await this.drpSupplierOption.click();
        await this.txtSubCategory.fill(subCategory);
        await this.txtTaxID.fill(taxID);
        await this.txtCompanyRegistrationNo.fill(registrationNo);
        await this.txtWebsitelink.fill(websiteLink);
    }

    // Address section action method 
    async enterAddressDetails(
        address: string,
        city: string,
        state: string,
        postalCode: string,
        country: string
    ) {
        await this.txtAddress.fill(address);
        await this.txtCity.fill(city);
        await this.txtState.fill(state);
        await this.txtpostalCode.fill(postalCode);
        await this.txtCountry.fill(country);
    }

    // Contact Details section page action method
    async enterContactDetails(
        name: string,
        title: string,
        email: string,
        number: string
    ) {
        await this.txtName.fill(name);
        await this.txtTitle.fill(title);
        await this.txtEmail.fill(email);
        await this.txtNumber.fill(number);
    }
    async clickAddContact() {
        await this.btnAddContact.click();
    }
    async clickRemoveContact() {
        await this.btnContactRemove.click();
    }

    async clickAddCertificate() {
        await this.btnAddCertificate.click();
    }

    async enterCertificationDetails(
        certificationName: string,
        issuingBody: string,
        issueDate: string,
        expireDate: string
    ) {
        await this.txtCertificationName.fill(certificationName);
        await this.txtIssuingBody.fill(issuingBody);
        await this.txtIssueDate.fill(issueDate);
        await this.txtExpireDate.click();
        await this.txtExpireDate.fill(expireDate);
    }

    async clickCertifiacteRemove() {
        await this.btnRemoveCertificate.click();
    }

    // Pricing & Financial 

    async seletcPaymentTerm() {
       await this.drppaymentTeam.click();
       await this.paymentTeamOption.click();
    }
      async seletcCurrency() {
        await this.drpCurrency.click();
        await this.currencyOption.click();
    }


    async enterPaymentAndBankDetails(
        bankName: string,
        accountName: string,
        internalNote: string
    ) {
        await this.txtBankName.fill(bankName);
        await this.txtAccountNumber.fill(accountName);
        await this.txtInternalNote.fill(internalNote);
    }

    async clickSaveSupplier(){
        await this.btnSaveSupplier.click();
    }

    async verifySupplierSavedMessage(){
       await expect (this.toastSuccessMessage).toContainText    
       ('Supplier saved. It will appear in the list shortly.'); 
    }
}