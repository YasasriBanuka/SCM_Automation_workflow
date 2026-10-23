import { Locator, Page } from "@playwright/test";

export class navigationFlow {

    readonly page: Page;

    // =============================Supplier Navigation=============================
    readonly lblSupplier: Locator;
    readonly lblDirectory: Locator;
    readonly btnAddSupplier: Locator;
    readonly btnImportSupplier: Locator;
    readonly btnExportSupplier: Locator;

    // =============================Raw Matrial Navigation=============================
    readonly lblRawMaterial: Locator;
    readonly lblRawMaterials: Locator;
    readonly btnAddRawMaterial: Locator;
    readonly btnImportRawMaterial: Locator;
    readonly btnExportRawMaterial: Locator;
    readonly clickValue: Locator;
    readonly clickDeactivateValue: Locator;
    readonly clickCannotDeactivation: Locator;

    // =============================Product Navigation=============================
    readonly lblnavigateProduct: Locator;
    readonly lblAddProductLink: Locator;
    readonly btnAddProduct: Locator;
    readonly lblPriceList: Locator;
    readonly addPriceListButton: Locator;

    readonly btnExport: Locator;

    // =============================Warehouse Navigation=============================
    readonly lblnavigateWarwehouse: Locator;
    readonly lblAddWarehouseLink: Locator;
    readonly btnAddWarehouse: Locator;
    readonly btnWarehouseName: Locator;

    // =============================Inventory Navigation=============================
    readonly lblnavigateInventory: Locator;
    readonly lblStockDashboardLink: Locator;
    readonly btnNewTransaction: Locator;
    readonly linkGoodsReceipt: Locator;
    readonly cycleCountLink: Locator;

    // =============================Bill of Material=============================
    readonly lblnavigateBillOfMaterial: Locator;
    readonly lblBillOfMaterialLink: Locator;
    readonly btnAddBillOfMaterial: Locator;

    // =============================Logistics=============================

    readonly lblLogistics: Locator;
    readonly linkCarriers: Locator;
    readonly btnAddCarrier: Locator;
    readonly linkVehicle: Locator;
    readonly btnAddVehicle: Locator;
    readonly linkRoute: Locator;
    readonly btnAddRoute: Locator;


    constructor(page: Page) {
        this.page = page;

        //Supplier
        this.lblSupplier = page.getByText('Suppliers', { exact: true });
        this.lblDirectory = page.getByRole('link', { name: 'Directory', exact: true });
        this.btnAddSupplier = page.getByRole('button', { name: 'Add Supplier', exact: true });
        this.btnImportSupplier = page.getByRole('button', { name: 'Import' });
        this.btnExportSupplier = page.getByRole('button', { name: 'Export' });

        // Raw Material
        this.lblRawMaterial = page.getByRole('button', { name: 'Raw Materials', exact: true });
        this.lblRawMaterials = page.getByRole('link', { name: 'Raw Materials', exact: true });
        this.btnAddRawMaterial = page.getByRole('button', { name: 'Add Raw Material', exact: true });
        this.btnImportRawMaterial = page.getByRole('button', { name: 'Import' });
        this.btnExportRawMaterial = page.getByRole('button', { name: 'Export' });
        this.clickValue = page.locator('tbody tr').filter({ hasText: 'RM_001' });
        this.clickDeactivateValue = page.locator('tbody tr').filter({ hasText: 'RM_002' });
        this.clickCannotDeactivation = page.locator('tbody tr').filter({ hasText: 'RM_001' });

        //Product 
        this.lblnavigateProduct = page.getByRole('button', { name: 'Products', exact: true });
        this.lblAddProductLink = page.getByRole('link', { name: 'Products', exact: true });
        this.btnAddProduct = page.getByRole('button', { name: 'Add Product', exact: true });
        this.lblPriceList = page.getByRole('link', { name: 'Price Lists', exact: true });
        this.addPriceListButton = page.getByRole('button', { name: 'Add Price List', exact: true });

        this.btnExport = page.getByRole('button', { name: 'Export', exact: true });

        //Warehouse
        this.lblnavigateWarwehouse = page.getByRole('button', { name: 'Warehouses', exact: true });
        this.lblAddWarehouseLink = page.getByRole('link', { name: 'Directory', exact: true });
        this.btnAddWarehouse = page.getByRole('button', { name: 'Add Warehouse', exact: true });
        this.btnWarehouseName = page.locator('tbody tr');

        //Inventory
        this.lblnavigateInventory = page.getByRole('button', { name: 'Inventory', exact: true });
        this.lblStockDashboardLink = page.getByRole('link', { name: 'Stock Dashboard', exact: true });
        this.btnNewTransaction = page.getByRole('button', { name: 'New Transaction', exact: true });
        this.linkGoodsReceipt = page.getByRole('link', { name: 'Goods Receipt', exact: true });
        this.cycleCountLink = page.getByRole('link', { name: 'Cycle Count', exact: true });

        //Bill of Material
        this.lblnavigateBillOfMaterial = page.getByRole('button', { name: 'Bill of Materials', exact: true });
        this.lblBillOfMaterialLink = page.getByRole('link', { name: 'All BOMs', exact: true });
        this.btnAddBillOfMaterial = page.getByRole('button', { name: 'New BOM', exact: true });

        //Logistics
        this.lblLogistics = page.getByRole('button', { name: 'Logistics', exact: true });
        this.linkCarriers = page.getByRole('link', { name: 'Carriers', exact: true });
        this.btnAddCarrier = page.getByRole('button', { name: 'Add Carrier', exact: true });
        this.linkVehicle = page.getByRole('link', { name: 'Vehicles', exact: true });
        this.btnAddVehicle = page.getByRole('button', { name: 'Add Vehicle', exact: true });
        this.linkRoute = page.getByRole('link', { name: 'Routes', exact: true });
        this.btnAddRoute = page.getByRole('button', { name: 'Create Route', exact: true });
    }

    //Supplier 
    async clickLblSupplier() {
        await this.lblSupplier.click();
    }
    async ClicklblDirectory() {
        await this.lblDirectory.click();
    }
    async clickbtnAddSupplier() {
        await this.btnAddSupplier.click();
    }
    async clickImportSupplier() {
        await this.btnImportSupplier.click();
    }
    async clickExportSupplier() {
        await this.btnExportSupplier.click();
    }

    //Raw Materila
    async clickLblRawMaterial() {
        await this.lblRawMaterial.click();
    }
    async ClicklblRawMaterials() {
        await this.lblRawMaterials.click();
    }
    async clickbbtnAddRawMaterial() {
        await this.btnAddRawMaterial.click();
    }
    async clickImport() {
        await this.btnImportRawMaterial.click();
    }
    async clickExport() {
        await this.btnExportRawMaterial.click();
    }
    async clickRMRow() {
        await this.clickValue.click();
    }
    async clickDeactivatevalue() {
        await this.clickDeactivateValue.click();
    }
    async clickCannotDeactivationvalue() {
        await this.clickCannotDeactivation.click();
    }

    //product
    async clickProducts() {
        await this.lblnavigateProduct.click();
        await this.lblAddProductLink.click();
        await this.btnAddProduct.click();
    }

    async clickPriceList() {
        await this.lblnavigateProduct.click();
        await this.lblPriceList.click();
        await this.addPriceListButton.click();
    }

    async btnclickPriceList() {
        await this.lblnavigateProduct.click();
        await this.lblPriceList.click();
    }

    async clicExportkPriceList() {
        await this.btnExport.click();
    }

    // Warehouse 
    async navigateToAddWarehouse() {
        await this.lblnavigateWarwehouse.click();
        await this.lblAddWarehouseLink.click();
        await this.btnAddWarehouse.click();
    }

    async viewAddWarehouse() {
        await this.lblnavigateWarwehouse.click();
        await this.lblAddWarehouseLink.click();
    }

    async selectWarehouse(warehouseName: string) {
        await this.btnWarehouseName.filter({ hasText: warehouseName }).click();
    }

    async selectSecondWarehouse() {
        await this.btnWarehouseName.nth(1).click();
    }

    async clickInventory() {
        await this.lblnavigateInventory.click();
        await this.lblStockDashboardLink.click();
        await this.btnNewTransaction.click();
    }

    async clickInventory1() {
        await this.lblnavigateInventory.click();
        await this.lblStockDashboardLink.click();
    }
    async clickGoodsReceipt() {
        await this.lblnavigateInventory.click();
        await this.linkGoodsReceipt.click();
    }
    async clickCycleCount() {
        await this.lblnavigateInventory.click();
        await this.cycleCountLink.click();
    }

    //Bill of Material
    async clickBillOfMaterial() {
        await this.lblnavigateBillOfMaterial.click();
        await this.lblBillOfMaterialLink.click();
    }

    async clickAddBillOfMaterial() {
        await this.clickBillOfMaterial();
        await this.btnAddBillOfMaterial.click();

    }

    //Logistics
    async clickLogistics() {
        await this.lblLogistics.click();
    }

    async clickCarriers() {
        await this.clickLogistics();
        await this.linkCarriers.click();
        await this.btnAddCarrier.click();
    }
    async viewCarriers() {
        await this.clickLogistics();
        await this.linkCarriers.click();
    }

    async clickVehicle() {
        await this.clickLogistics();
        await this.linkVehicle.click();
        await this.btnAddVehicle.click();
    }

    async clickSelectedVehicle(registrationNumber: string) {
        await this.clickLogistics();
        await this.linkVehicle.click();
        const targetRow = this.page
            .locator('tbody tr')
            .filter({ has: this.page.getByText(registrationNumber, { exact: true })
         });

        await targetRow.click();
    }

    async clickRoute() {
        await this.clickLogistics();
        await this.linkRoute.click();
        await this.btnAddRoute.click();
    }

    async viewRoute() {
        await this.clickLogistics();
        await this.linkRoute.click();
    }


}