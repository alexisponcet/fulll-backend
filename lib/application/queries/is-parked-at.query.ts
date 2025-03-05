import { Location } from '@/lib/domain/models/location.model.js';
import { VehicleQueriesPort } from '@/lib/domain/ports/vehicle/vehicle-queries.port.js';

/**
 * Query for checking if a vehicle is parked at a specific location.
 */
export class IsParkedAtQuery {
	constructor(private readonly vehicleRepository: VehicleQueriesPort) {}

	public async execute(plateNumber: string, location: Location): Promise<boolean> {
		const vehicle = await this.vehicleRepository.findVehicleByPlateNumber(plateNumber);
		if (!vehicle) throw new Error(`Vehicle #${plateNumber} not found !`);

		return this.vehicleRepository.isParkedAt(vehicle, location);
	}
}
