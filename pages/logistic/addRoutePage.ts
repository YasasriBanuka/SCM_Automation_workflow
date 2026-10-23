import { expect, Locator, Page } from "@playwright/test";

export class route {
    readonly page: Page;

    // Origin / Route Details
    readonly txtOriginName: Locator;
    readonly txtOriginLatitude: Locator;
    readonly txtOriginLongitude: Locator;
    readonly ddlCarrier: Locator;
    readonly ddlVehicle: Locator;
    readonly ddlOptimizeMode: Locator;
    readonly txtScheduledDate: Locator;
    readonly txtNotes: Locator;
    readonly addStop: Locator;

    // Delivery Stop Details
    readonly txtConName: Locator;
    readonly txtAddress: Locator;
    readonly txtCity: Locator;
    readonly txtScheduledDates: Locator;
    readonly txtDestinationLatitude: Locator;
    readonly txtDestinationLongitude: Locator;
    readonly txtWeight: Locator;
    readonly txtVolume: Locator;
    readonly txtNote: Locator;
    readonly btncreateroute: Locator;


    // added route view workflow 
    readonly rowRoute: Locator;
    readonly btnDelivered: Locator;

    constructor(page: Page) {
        this.page = page;

        // Origin / Route Details
        this.txtOriginName = page.getByPlaceholder('Colombo Warehouse');
        this.txtOriginLatitude = page.getByPlaceholder('6.9271').first();
        this.txtOriginLongitude = page.getByPlaceholder('79.8612').first();
        this.ddlCarrier = page.getByRole('button', { name: 'Company-owned / None', exact: true });
        this.ddlVehicle = page.getByRole('button', { name: 'None', exact: true });
        this.ddlOptimizeMode = page.getByRole('button', { name: 'fastest time', exact: true });
        this.txtScheduledDate = page.locator('input[type="date"]');
        this.txtNotes = page.getByPlaceholder('Any notes about this route…');
        this.addStop = page.getByRole('button', { name: 'Add Stop', exact: true });

        // Delivery Stop Details
        this.txtConName = page.getByPlaceholder('Kamal Silva');
        this.txtAddress = page.getByPlaceholder('45 Galle Road, Colombo 03');
        this.txtCity = page.getByPlaceholder('Colombo', { exact: true });
        this.txtScheduledDates = page.locator('input[type="datetime-local"]');
        this.txtDestinationLatitude = page.getByPlaceholder('6.9271').nth(1);
        this.txtDestinationLongitude = page.getByPlaceholder('79.8612').nth(1);
        this.txtWeight = page.locator('input[type="number"][placeholder="150.5"]');
        this.txtVolume = page.locator('input[type="number"][placeholder="0.8"]');
        this.txtNote = page.getByPlaceholder('Leave at reception');
        this.btncreateroute = page.getByRole('button', { name: 'Create Route', exact: true }).last();

        // view Route 
        this.rowRoute = page.locator('tbody tr').filter({ hasText: 'ROUTE-2026-0005' });
        this.btnDelivered = page.getByRole('button',{name:'Delivered', exact:true});

    }

    // Create New Route
    async createNewRoute(
        originName: string,
        latitude: string,
        longitude: string,
        date: string,
        notes: string
    ) {
        await this.txtOriginName.fill(originName);
        await this.txtOriginLatitude.fill(latitude);
        await this.txtOriginLongitude.fill(longitude);
        await this.ddlCarrier.click();
        await this.page.getByRole('option', { name: 'ABC Express', exact: true }).click();
        await this.ddlVehicle.click();
        await this.page.getByRole('option', { name: 'CAB-1234 (container) — ABC Express', exact: true }).click();
        await this.ddlOptimizeMode.click();
        await this.page.getByRole('option', { name: 'fastest time', exact: true }).click();
        await this.txtScheduledDate.fill(date);
        await this.txtNotes.fill(notes);

        // Open Delivery Stop form
        await this.addStop.click();
    }

    // Add Delivery Stop
    async addRouteStop(
        contactname: string,
        address: string,
        city: string,
        scheduledDate: string,
        slatitude: string,
        slongitude: string,
        weight: string,
        volume: string,
        note: string
    ) {
        await this.txtConName.fill(contactname);
        await this.txtAddress.fill(address);
        await this.txtCity.fill(city);
        await this.txtScheduledDates.fill(scheduledDate);

        // Delivery Stop coordinates
        await this.txtDestinationLatitude.fill(slatitude);
        await this.txtDestinationLongitude.fill(slongitude);

        // Delivery Stop additional details
        await this.txtWeight.fill(weight);
        await this.txtVolume.fill(volume);
        await this.txtNote.fill(note);
        await this.btncreateroute.click();
        await expect(this.page.locator('.Toastify__toast--success')).toContainText('Route created. Redirecting…');
    }

    async clickRoute() {
        const targetRow = this.page.locator('tbody tr').filter({
            hasText: 'ROUTE-2026-0005'
        });

        await expect(targetRow).toBeVisible();
        await targetRow.click();
        await this.btnDelivered.click();
        
    }

    async clickRouteDetails() {
        const targetRow = this.page.locator('tbody tr').filter({
            hasText: 'ROUTE-2026-0005'
        });

        await expect(targetRow).toBeVisible();
        await targetRow.click();
    }
}
