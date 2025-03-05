import { Vehicle } from '@/lib/domain/models/vehicle.entity.js';
import { VehicleCommandsPort } from '@/lib/domain/ports/vehicle/vehicle-commands.port.js';

/**
 * Command for creating a new vehicle.
 * If the vehicle already exists, an error will be thrown.
 */
export class CreateVehicleCommand {
	constructor(private readonly vehicleRepository: VehicleCommandsPort) {}

	public async execute(plateNumber: string): Promise<void> {
		try {
			await this.vehicleRepository.createVehicle(new Vehicle(plateNumber));
		} catch {
			throw new Error(`Vehicle #${plateNumber} already exists !`);
		}
	}
}
