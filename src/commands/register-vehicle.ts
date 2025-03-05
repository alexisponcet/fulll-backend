import { IVehicleFleetActions } from '@/lib/index.js';

/**
 * Registers a vehicle into a fleet and logs a success message to the console once the vehicle is successfully registered.
 * @param {IVehicleFleetActions} params.commands - The object containing commands for interacting with the fleet and vehicle.
 * @param {string} fleetId - The ID of the fleet where the vehicle will be registered.
 * @param {string} vehiclePlateNumber - The plate number of the vehicle to be registered.
 * @returns {Promise<void>}
 */
export const runRegisterVehicle = async (
	{ commands }: IVehicleFleetActions,
	fleetId: string,
	vehiclePlateNumber: string
): Promise<void> => {
	/* State initialization */
	try {
		await commands.createFleetCommand.execute(fleetId);
	} catch {} // eslint-disable-line no-empty
	try {
		await commands.createVehicleCommand.execute(vehiclePlateNumber);
	} catch {} // eslint-disable-line no-empty

	/* Main command */
	await commands.registerVehicleCommand.execute(fleetId, vehiclePlateNumber);
	console.log(
		`You have registered the vehicle #${vehiclePlateNumber} into the fleet #${fleetId} !`
	);
};
