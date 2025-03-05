import { Location } from '@/lib/domain/models/location.model.js';
import { VehicleCommandsPort } from '@/lib/domain/ports/vehicle/vehicle-commands.port.js';
import { VehicleQueriesPort } from '@/lib/domain/ports/vehicle/vehicle-queries.port.js';

/**
 * Command for parking a vehicle at a specific location.
 * If the vehicle is already parked at that location or the vehicle does not exist, an error will be thrown.
 */
export class ParkVehicleAtCommand {
	constructor(private readonly vehicleRepository: VehicleCommandsPort & VehicleQueriesPort) {}

	public async execute(plateNumber: string, location: Location): Promise<void> {
		const vehicle = await this.vehicleRepository.findVehicleByPlateNumber(plateNumber);
		if (!vehicle) throw new Error(`Vehicle #${plateNumber} not found !`);

		if (await this.vehicleRepository.isParkedAt(vehicle, location)) {
			throw new Error(
				`Vehicle #${vehicle.id} already parked at the location: ${location.toString()} !`
			);
		}

		await this.vehicleRepository.parkVehicleAt(vehicle, location);
	}
}
