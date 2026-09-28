import { Page } from '@playwright/test';

import { rawMaterialData } from './testData';
import { AddRawMaterialData } from '../pages/rawMaterials/addRawMaterialData';
import { changeRawMaterilaDetails } from '../pages/rawMaterials/chnageAddedRawMatDetailsPage';


export async function addRawMaterial(page: Page) {

    const rawMaterial = new AddRawMaterialData(page);

    await rawMaterial.enterItemCode(rawMaterialData.itemCode);
    await rawMaterial.selectUOM(rawMaterialData.uom);
    await rawMaterial.enterDescription(rawMaterialData.description);
    await rawMaterial.enterPurchaseLeadTime(
        rawMaterialData.purchaseLeadTime
    );
    await rawMaterial.enterQCLeadTime(
        rawMaterialData.qcLeadTime
    );  
}

export async function fillRawMaterialWithoutItemCode(page: Page) {

    const rawMaterial = new AddRawMaterialData(page);

    await rawMaterial.selectUOM(rawMaterialData.uom);
    await rawMaterial.enterDescription(rawMaterialData.description);
    await rawMaterial.enterPurchaseLeadTime(
        rawMaterialData.purchaseLeadTime
    );
    await rawMaterial.enterQCLeadTime(
        rawMaterialData.qcLeadTime
    );
}

export async function fillRawMaterialWithoutDescription(page: Page) {

    const rawMaterial = new AddRawMaterialData(page);

    await rawMaterial.enterItemCode(rawMaterialData.itemCode);
    await rawMaterial.selectUOM(rawMaterialData.uom);
    await rawMaterial.enterPurchaseLeadTime(
        rawMaterialData.purchaseLeadTime
    );
    await rawMaterial.enterQCLeadTime(
        rawMaterialData.qcLeadTime
    );
}

export async function updateRawMaterialToPCS(page: Page) {

    const changeValue = new changeRawMaterilaDetails(page);

    await changeValue.verifySaveChangesDisabled();

    await changeValue.selectPCS();

    await changeValue.verifySaveChangesEnabled();

    await changeValue.clickSaveChanges();

    await changeValue.verifyRawMaterialUpdatedToast();
}

export async function deactivateRawMaterial(page: Page) {
    const changeValue = new changeRawMaterilaDetails(page);

    await page.getByText(
        rawMaterialData.deactivate.itemCode,
        { exact: true }
    ).click();

    await changeValue.clickDeactivateButton();
    await changeValue.confirmDeactivate();
    await changeValue.verifyDeactivateSuccessMessage();
}

export async function notdeactivateRawMaterial(page: Page) {
    const changeValue = new changeRawMaterilaDetails(page);

    // Click RM_001
    await page.getByText(
        rawMaterialData.itemCode,
        { exact: true }
    ).click();

    // Try to deactivate
    await changeValue.clickDeactivateButton();
    await changeValue.confirmDeactivate();

    // Verify deactivation is not allowed
    await changeValue.verifyCannotDeactivationMessage();
}