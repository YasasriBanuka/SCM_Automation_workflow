import test from "@playwright/test";
import { adminLoginPage } from "../../pages/adminLoginPage/adminLoginPage";
import { navigateProduct } from "../../pages/products/navigateProductsPage";
import { loginAsAdmin } from "../../utils/login";
import { addNewPriceList } from "../../pages/products/addPriceListPage";

test('TC_001 : Verify that an admin user can move to pricelist section successfully ', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);

    const productPage = new navigateProduct(page);
    // Navigate to Raw Materials
    await productPage.clickPriceList();

})

test('TC_002: Verify that an admin user can add new priceList details successfully ', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);

    const productPage = new navigateProduct(page);
    // Navigate to product pricelist section 
    await productPage.clickPriceList();

    const priceList = new addNewPriceList(page);

    await priceList.enterPriceListName('Standard_Retail_Price_List_2026');

    // Enter Description
    await priceList.enterDescription(
        'Default price list for all retail customers -2026'
    );

    // Select Currency
    await priceList.selectCurrencyLKR();
    // Select Valid From - Today
    await priceList.selectValidFromToday();
    // Select Valid To - Next Month 30th
    await priceList.selectValidToNextMonth30();

    await priceList.searchAndSelectItem('001');

    await priceList.addLineItemData(
        1,
        '1250.00',
        '10',
        'Bulk discount applies'
    );

    await priceList.clickSavePriceList();

    await priceList.verifyPriceListSavedToast();

    await page.waitForTimeout(4000);

})