import { FleetQueriesPort } from '@/lib/domain/ports/fleet/fleet-queries.port.js';
import { VehicleQueriesPort } from '@/lib/domain/ports/vehicle/vehicle-queries.port.js';

/**
 * Query for checking if a vehicle is associated with a specific fleet.
 */
export class HasVehicleQuery {
	constructor(
		private readonly fleetRepository: FleetQueriesPort,
		private readonly vehicleRepository: VehicleQueriesPort
	) {}

	public async execute(fleetId: string, plateNumber: string): Promise<boolean> {
		const fleet = await this.fleetRepository.findFleetById(fleetId);
		if (!fleet) throw new Error(`Fleet #${fleetId} not found !`);

		const vehicle = await this.vehicleRepository.findVehicleByPlateNumber(plateNumber);
		if (!vehicle) throw new Error(`Vehicle #${plateNumber} not found !`);

		return this.fleetRepository.hasVehicle(fleet, vehicle);
	}
}
