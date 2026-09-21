import { test, expect } from '@playwright/test';
import { adminLoginPage } from '../../pages/adminLoginPage/adminLoginPage';
import { supplierApprovePage } from '../../pages/supplier/supplierApprovePage';

test('TC_003 : Verify that the admin can successfully change the supplier status from Pending Approval to Approved for BOI Holding.', async ({ page }) => {

    await page.goto('/signin');

    // System Admin Login
    const adminLogin = new adminLoginPage(page);
    await adminLogin.enterUsername('admin.primary@companydemo.com');
    await adminLogin.enterPassword('Admin@2026!');
    await adminLogin.selectBranch();
    await adminLogin.clickcheckbox();
    await adminLogin.clickLogin();

    // Wait for dashboard to load
    await page.waitForURL('**/dashboard');

    // Navigate to Suppliers > Approvals
    const approvePage = new supplierApprovePage(page);
    await approvePage.clickLblSupplier();
    await approvePage.clickLblApprovals();

    // Wait for Supplier Approvals page to load
    await page.waitForURL('**/suppliers/approvals');

    // Verify MAS Holding is visible in the Pending Review table
    await expect(page.getByText('BOI Holding').first()).toBeVisible();

    // Click Approve button for MAS Holding
    await approvePage.clickApproveBOIHolding();

    // Verify the Approve Supplier dialog appeared (h2 heading observed in DOM diff Step 12)
    await expect(page.getByText('Approve Supplier', { exact: true }).first()).toBeVisible();

    // Click Approve to confirm (no comment required)
    await approvePage.clickApproveConfirm();

    // Verify success toast: "Supplier approved successfully."
    await expect(page.getByText('Supplier approved successfully.')).toBeVisible();

    // Verify MAS Holding moved to Recently Actioned with Approved status
    await expect(
        page.locator('tr').filter({ hasText: 'BOI Holding' }).getByText('Approved')
    ).toBeVisible();
    
});
