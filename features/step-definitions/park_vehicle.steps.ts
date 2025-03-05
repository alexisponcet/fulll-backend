/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { VehicleFleetLocation } from '@/lib/index.js';
import { actions, vehiclePlateNumber } from './setup.js';

let location: VehicleFleetLocation;
let parkVehicleAtError: Error | null;

Given('a location', function () {
	location = new VehicleFleetLocation(3, 5, 7);
});

Given('my vehicle has been parked into this location', async () => {
	await actions.commands.parkVehicleAtCommand.execute(vehiclePlateNumber, location);
});

When('I park my vehicle at this location', async () => {
	await actions.commands.parkVehicleAtCommand.execute(vehiclePlateNumber, location);
});

When('I try to park my vehicle at this location', async () => {
	try {
		await actions.commands.parkVehicleAtCommand.execute(vehiclePlateNumber, location);
	} catch (error) {
		parkVehicleAtError = error as Error;
	}
});

Then('the known location of my vehicle should verify this location', async () => {
	expect(await actions.queries.isParkedAtQuery.execute(vehiclePlateNumber, location)).to.be.true;
});

Then('I should be informed that my vehicle is already parked at this location', () => {
	expect(parkVehicleAtError?.message).to.equal(
		`Vehicle #${vehiclePlateNumber} already parked at the location: ${location.toString()} !`
	);
});
