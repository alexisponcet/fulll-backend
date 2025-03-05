/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai';
import { v4 as uuidv4 } from 'uuid';
import { Given, When, Then } from '@cucumber/cucumber';
import { actions, vehiclePlateNumber } from './setup.js';

const myFleetId = uuidv4();
const otherFleetId = uuidv4();
let registerVehicleError: Error | null;

Given('my fleet', async () => {
	await actions.commands.createFleetCommand.execute(myFleetId);
});

Given('a vehicle', async () => {
	await actions.commands.createVehicleCommand.execute(vehiclePlateNumber);
});

Given('the fleet of another user', async () => {
	await actions.commands.createFleetCommand.execute(otherFleetId);
});

Given('I have registered this vehicle into my fleet', async () => {
	await actions.commands.registerVehicleCommand.execute(myFleetId, vehiclePlateNumber);
});

Given("this vehicle has been registered into the other user's fleet", async () => {
	await actions.commands.registerVehicleCommand.execute(otherFleetId, vehiclePlateNumber);
});

When('I register this vehicle into my fleet', async () => {
	await actions.commands.registerVehicleCommand.execute(myFleetId, vehiclePlateNumber);
});

When('I try to register this vehicle into my fleet', async () => {
	try {
		await actions.commands.registerVehicleCommand.execute(myFleetId, vehiclePlateNumber);
	} catch (error) {
		registerVehicleError = error as Error;
	}
});

Then('this vehicle should be part of my vehicle fleet', async () => {
	expect(await actions.queries.hasVehicleQuery.execute(myFleetId, vehiclePlateNumber)).to.be.true;
});

Then('I should be informed this this vehicle has already been registered into my fleet', () => {
	expect(registerVehicleError?.message).to.equal(
		`Vehicle #${vehiclePlateNumber} already registered into the fleet #${myFleetId} !`
	);
});
