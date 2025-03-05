import { IVehicleFleetActions, VehicleFleetLocation } from '@/lib/index.js';

/**
 * Parks a vehicle at a given location and logs the vehicle's location to the console once the parking action is completed.
 * @param {IVehicleFleetActions} params.commands - The object that contains the commands to manipulate the fleet and vehicle.
 * @param {string} fleetId - The ID of the fleet where the vehicle is being registered.
 * @param {string} vehiclePlateNumber - The plate number of the vehicle to be localized.
 * @param {number} lat - The latitude of the location where the vehicle will be parked.
 * @param {number} lng - The longitude of the location where the vehicle will be parked.
 * @param {number} [alt] - The optional altitude of the location where the vehicle will be parked (default is undefined).
 * @returns {Promise<void>}
 */
export const runLocalizeVehicle = async (
	{ commands }: IVehicleFleetActions,
	fleetId: string,
	vehiclePlateNumber: string,
	lat: number,
	lng: number,
	alt?: number
): Promise<void> => {
	/* State initialization */
	const location = new VehicleFleetLocation(lat, lng, alt);
	try {
		await commands.createFleetCommand.execute(fleetId);
	} catch {} // eslint-disable-line no-empty
	try {
		await commands.createVehicleCommand.execute(vehiclePlateNumber);
	} catch {} // eslint-disable-line no-empty
	try {
		await commands.registerVehicleCommand.execute(fleetId, vehiclePlateNumber);
	} catch {} // eslint-disable-line no-empty

	/* Main command */
	await commands.parkVehicleAtCommand.execute(vehiclePlateNumber, location);
	console.log(
		`You have parked the vehicle #${vehiclePlateNumber} at the following location: ${location.toString()}`
	);
};
