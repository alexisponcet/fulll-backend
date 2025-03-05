import { FleetQueriesPort } from '@/lib/domain/ports/fleet/fleet-queries.port.js';
import { FleetCommandsPort } from '@/lib/domain/ports/fleet/fleet-commands.port.js';
import { VehicleQueriesPort } from '@/lib/domain/ports/vehicle/vehicle-queries.port.js';

/**
 * Command for registering a vehicle to a fleet.
 * If the fleet contains already the vehicle or the fleet/vehicle does not exist, an error will be thrown.
 */
export class RegisterVehicleCommand {
	constructor(
		private readonly fleetRepository: FleetCommandsPort & FleetQueriesPort,
		private readonly vehicleRepository: VehicleQueriesPort
	) {}

	public async execute(fleetId: string, plateNumber: string): Promise<void> {
		const fleet = await this.fleetRepository.findFleetById(fleetId);
		if (!fleet) throw new Error(`Fleet #${fleetId} not found !`);

		const vehicle = await this.vehicleRepository.findVehicleByPlateNumber(plateNumber);
		if (!vehicle) throw new Error(`Vehicle #${plateNumber} not found !`);

		if (await this.fleetRepository.hasVehicle(fleet, vehicle)) {
			throw new Error(
				`Vehicle #${plateNumber} already registered into the fleet #${fleetId} !`
			);
		}

		await this.fleetRepository.registerVehicle(fleet, vehicle);
	}
}
