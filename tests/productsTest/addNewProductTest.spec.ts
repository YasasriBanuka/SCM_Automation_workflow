import test from "@playwright/test";
import { adminLoginPage } from "../../pages/adminLoginPage/adminLoginPage";
import { navigateProduct } from "../../pages/products/navigateProductsPage";
import { addNewProduct } from "../../pages/products/addNewProductDetailsPage";
import { loginAsAdmin } from "../../utils/login";



test('TC_001 : Verify that an admin user can move to product section successfully ', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);

    const supplierPage = new navigateProduct(page);
    // Navigate to Raw Materials
    await supplierPage.clickProducts();

})

test('TC_002: Verify that an admin user can add new product details successfully ', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);

    const productPage = new navigateProduct(page);
    // Navigate to Raw Materials
    await productPage.clickProducts();

    const addProduct = new addNewProduct(page);
    await addProduct.enterProductInformation(
        'PKG-BOX-M',
        'Large Corrugated Box 30x20x15cm',
        'Packaging'
    );
    await addProduct.selectUOM('PCS');

    // Add data for Raw Material
    await addProduct.addProduct1();
    await addProduct.selectComponentItem('RM_001');
    await addProduct.enterRawMaterialDetails(
        '10',
        '2',
        'Corrugated packaging material'
    );

    await addProduct.addMaterial();

    //add new Barcode 
    await addProduct.clickAddBarcode();
    await addProduct.enterBarcode('87123451');
    await addProduct.selectBarcodeType('EAN8');

    //Click Button 
    await addProduct.clickSaveProduct();
    await addProduct.verifyAddProductSuccessMessage();

    await page.waitForTimeout(4000);

})

test('TC_003: Verify that an admin user can not add new product with already exist Item code', async ({ page }) => {

    await page.goto('/signin');

    await loginAsAdmin(page);

    const productPage = new navigateProduct(page);
    // Navigate to Raw Materials

    await productPage.clickProducts();

    const addProduct = new addNewProduct(page);
    await addProduct.enterProductInformation(
        'PKG-BOX-M',
        'Large Corrugated Box 30x20x15cm',
        'Packaging'

    );
    await addProduct.selectUOM('PCS');

    // Add data for Raw Material
    await addProduct.addProduct1();
    await addProduct.selectComponentItem('RM_001');
    await addProduct.enterRawMaterialDetails(
        '10',
        '2',
        'Corrugated packaging material'
    );

    await addProduct.addMaterial();

    //add new Barcode 
    await addProduct.clickAddBarcode();
    await addProduct.enterBarcode('87123451');
    await addProduct.selectBarcodeType('EAN8');

    //Click Button 
    await addProduct.clickSaveProduct();
    await addProduct.verifyErrorProductSuccessMessage();

    await page.waitForTimeout(4000);



})