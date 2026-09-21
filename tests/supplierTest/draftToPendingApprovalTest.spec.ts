import { test, expect } from '@playwright/test';

import { approvalWorkFlowSupplierPage } from '../../pages/supplier/approvalWorkFlowSupplierPage';
import { adminLoginPage } from '../../pages/adminLoginPage/adminLoginPage';

test('TC_004 : Verify that the admin can successfully change the supplier status from Draft to Pending Approval for added supplier detilas', async ({ page }) => {

    await page.goto('/signin');

    // System Admin Login
    const adminLogin = new adminLoginPage (page);
    await adminLogin.enterUsername('admin.operations@companydemo.com');
    await adminLogin.enterPassword('Admin@2026!');
    await adminLogin.selectBranch();
    await adminLogin.clickcheckbox();
    await adminLogin.clickLogin();

    // Navigate to Suppliers > Directory
    const approvalFlow = new approvalWorkFlowSupplierPage(page);
    await approvalFlow.clickLblSupplier();
    await approvalFlow.ClicklblDirectory();

    // Open MAS Holding row actions and navigate to View More
    await approvalFlow.clickRowActionsMasHolding();
    await approvalFlow.clickbtnViewMore();

    // Verify supplier detail page loaded for MAS Holding
    await expect(page.getByText('BOI Holding', { exact: true }).first()).toBeVisible();
    await approvalFlow.clickSubmitForApproval();
    await expect(page.getByText('Submit for Approval', { exact: true }).first()).toBeVisible();
    await approvalFlow.enterComment('Submitting BOI Holding supplier for approval review');
    await approvalFlow.clickSubmit();

    // Test case verification
    await expect(page.getByText('Supplier submitted for approval.')).toBeVisible();

    // Verify Approve and Reject buttons are now visible (status changed to Pending Approval)
    await expect(page.getByText('Approve', { exact: true })).toBeVisible();
    await expect(page.getByText('Reject', { exact: true })).toBeVisible();

});
