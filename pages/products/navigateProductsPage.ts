import { Locator, Page } from "@playwright/test";

export class navigateProduct{
    readonly page:Page;
    readonly lblnavigateProduct:Locator;
    readonly lblAddProductLink :Locator;
    readonly btnAddProduct : Locator;
    readonly lblPriceList:Locator;
    readonly addPriceListButton:Locator;

    constructor(page:Page){
        this.page =page;
        this.lblnavigateProduct = page.getByRole('button', { name: 'Products', exact: true });
        this.lblAddProductLink = page.getByRole('link', { name: 'Products', exact: true }); 
        this.btnAddProduct = page.getByRole('button', {name: 'Add Product',exact: true});
        this.lblPriceList = page.getByRole('link', { name: 'Price Lists', exact: true }); 
        this.addPriceListButton = page.getByRole('button', { name: 'Add Price List', exact: true });
    
}
    async clickProducts(){
        await this.lblnavigateProduct.click();
        await this.lblAddProductLink.click();
        await this.btnAddProduct.click();
    }

    async clickPriceList(){
        await this.lblnavigateProduct.click();
        await this.lblPriceList.click(); 
        await this.addPriceListButton.click();
    }
    
}
