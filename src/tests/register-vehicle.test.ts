import { expect } from 'chai';
import { runCommand } from './jest.setup.js';

const fleetId: string = '1';
const anotherFleetId: string = '2';
const vehiclePlateNumber: string = 'AA-123-ZZ';
const runRegisterVehicle = (args: string[] = []): Promise<string> =>
	runCommand(['register-vehicle', ...args]);

describe('without vehicle plate number argument', () => {
	it('should throw an error', async () => {
		await expect(runRegisterVehicle()).to.be.rejectedWith('missing required argument');
		await expect(runRegisterVehicle([fleetId])).to.be.rejectedWith('missing required argument');
	});
});

describe('with vehicle plate number argument', () => {
	it('register vehicle : should display a success message', async () => {
		expect(await runRegisterVehicle([fleetId, vehiclePlateNumber])).to.contain(
			`registered the vehicle #${vehiclePlateNumber} into the fleet #${fleetId}`
		);
	});

	it('register vehicle into another fleet : should display a success message', async () => {
		await runRegisterVehicle([fleetId, vehiclePlateNumber]);
		expect(await runRegisterVehicle([anotherFleetId, vehiclePlateNumber])).to.contain(
			`registered the vehicle #${vehiclePlateNumber} into the fleet #${anotherFleetId}`
		);
	});

	it('register vehicle twice : should throw an error', async () => {
		await runRegisterVehicle([fleetId, vehiclePlateNumber]);
		await expect(runRegisterVehicle([fleetId, vehiclePlateNumber])).to.be.rejectedWith(
			'already registered'
		);
	});
});
