import { IVehicleFleetActions } from '@/lib/index.js';

/**
 * Creates a new fleet using the provided fleetId and logs a success message once the fleet is created.
 * @param {IVehicleFleetActions} params.commands - The commands object used to execute the fleet creation.
 * @param {string} fleetId - The ID of the fleet to be created.
 * @returns {Promise<void>}
 */
export const runCreate = async (
	{ commands }: IVehicleFleetActions,
	fleetId: string
): Promise<void> => {
	await commands.createFleetCommand.execute(fleetId);
	console.log(`You have created the fleet #${fleetId} !`);
};
