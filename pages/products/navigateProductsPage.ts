import { Locator, Page } from "@playwright/test";

export class navigateProduct{
    readonly page:Page;
    readonly lblnavigateProduct:Locator;
    readonly lblAddProductLink :Locator;
    readonly btnAddProduct : Locator;

    constructor(page:Page){
        this.page =page;
        this.lblnavigateProduct = page.getByRole('button', { name: 'Products', exact: true });
        this.lblAddProductLink = page.getByRole('link', { name: 'Products', exact: true }); 
        this.btnAddProduct = page.getByRole('button', {name: 'Add Product',exact: true});
    }
    
    async clickProducts(){
        await this.lblnavigateProduct.click();
        await this.lblAddProductLink.click();
        await this.btnAddProduct.click();
    }
}