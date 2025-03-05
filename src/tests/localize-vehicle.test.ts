import { expect } from 'chai';
import { runCommand } from './jest.setup.js';

const fleetId: string = '1';
const vehiclePlateNumber: string = 'AA-123-ZZ';
const latitude: string = '1';
const longitude: string = '2';
const altitude: string = '3';
const runLocalizeVehicle = (args: string[] = []): Promise<string> =>
	runCommand(['localize-vehicle', ...args]);

describe('without latitude and longitude arguments', () => {
	it('should throw an error', async () => {
		await expect(runLocalizeVehicle()).to.be.rejectedWith('missing required argument');
		await expect(runLocalizeVehicle([fleetId])).to.be.rejectedWith('missing required argument');
		await expect(runLocalizeVehicle([fleetId, vehiclePlateNumber])).to.be.rejectedWith(
			'missing required argument'
		);
		await expect(
			runLocalizeVehicle([fleetId, vehiclePlateNumber, latitude])
		).to.be.rejectedWith('missing required argument');
	});
});

describe('with latitude and longitude arguments', () => {
	it('localize vehicle : should display a success message', async () => {
		expect(
			await runLocalizeVehicle([fleetId, vehiclePlateNumber, latitude, longitude])
		).to.contain(
			`parked the vehicle #${vehiclePlateNumber} at the following location: [${latitude}, ${longitude}]`
		);
	});

	it('localize vehicle to the same location : should throw an error', async () => {
		await runLocalizeVehicle([fleetId, vehiclePlateNumber, latitude, longitude]);
		await expect(
			runLocalizeVehicle([fleetId, vehiclePlateNumber, latitude, longitude])
		).to.be.rejectedWith('already parked at the location');
	});
});

describe('with latitude, longitude and altitude arguments', () => {
	it('localize vehicle : should display a success message', async () => {
		expect(
			await runLocalizeVehicle([fleetId, vehiclePlateNumber, latitude, longitude, altitude])
		).to.contain(
			`parked the vehicle #${vehiclePlateNumber} at the following location: [${latitude}, ${longitude}, ${altitude}]`
		);
	});

	it('localize vehicle to the same location : should throw an error', async () => {
		await runLocalizeVehicle([fleetId, vehiclePlateNumber, latitude, longitude, altitude]);
		await expect(
			runLocalizeVehicle([fleetId, vehiclePlateNumber, latitude, longitude, altitude])
		).to.be.rejectedWith('already parked at the location');
	});
});
