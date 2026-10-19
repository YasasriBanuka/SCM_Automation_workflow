
import { Locator, Page } from "@playwright/test";

export class cycleCountPage {
    readonly page: Page;
    readonly btnFilter: Locator;
    readonly ddlWarehouseFilter: Locator;
    readonly btnApply: Locator;
    readonly targetRow: Locator;
    readonly txtCountedQuantity: Locator;
    readonly drpReason: Locator;

    constructor(page: Page) {
        this.page = page;

        this.btnFilter = page.getByRole('button', { name: 'Filter'});

        this.ddlWarehouseFilter = page.getByText('Warehouse', { exact: true }).locator('..').locator('select');

        this.btnApply = page.getByRole('button', { name: 'Apply',exact: true});

        // Select the first matching inventory row
        this.targetRow = page.getByRole('row', {name: /EL_001\[BLENDER\]/}).first();

        // Quantity input
        this.txtCountedQuantity = this.targetRow.getByPlaceholder('0');
        // Reason dropdown in the same row
        this.drpReason = this.targetRow.getByRole('combobox');
    }

    async filterByWarehouse() {
        await this.btnFilter.click();
        await this.ddlWarehouseFilter.selectOption({
            label: 'Colombo_01'
        });

        await this.btnApply.click();
    }

    // Action Method 1: Enter counted quantity
    async enterCountedQuantity(quantity: string) {
        await this.txtCountedQuantity.waitFor({
            state: 'visible'
        });

        await this.txtCountedQuantity.fill(quantity);

        const actualValue = await this.txtCountedQuantity.inputValue();

        console.log('Expected Quantity:', quantity);
        console.log('Actual Quantity:', actualValue);

        if (actualValue !== quantity) {
            throw new Error(`Quantity mismatch. Expected: ${quantity}, Actual: ${actualValue}`
            );
        }
    }

    // Action Method 2: Select reason
    async selectReason(reason: string) {
        await this.drpReason.waitFor({state: 'visible' });
        await this.drpReason.selectOption({label: reason});
        console.log(
            'Selected Reason:',
            await this.drpReason.locator('option:checked').textContent()
        );
    }
}
