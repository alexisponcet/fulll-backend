import { Repository } from './_repository.js';
import { Vehicle } from '@/lib/domain/models/vehicle.entity.js';
import { Location } from '@/lib/domain/models/location.model.js';
import { VehicleCommandsPort } from '@/lib/domain/ports/vehicle/vehicle-commands.port.js';
import { VehicleQueriesPort } from '@/lib/domain/ports/vehicle/vehicle-queries.port.js';

export class VehicleRepositoryInMemory
	extends Repository<Vehicle>
	implements VehicleCommandsPort, VehicleQueriesPort
{
	async createVehicle(vehicle: Vehicle): Promise<Vehicle> {
		return this.insertOne(vehicle);
	}

	async findVehicleByPlateNumber(plateNumber: string): Promise<Vehicle | undefined> {
		return this.findById(plateNumber);
	}

	async isParkedAt(vehicle: Vehicle, location: Location): Promise<boolean> {
		return !!vehicle.location?.isEqualWith(location);
	}

	async parkVehicleAt(vehicle: Vehicle, location: Location): Promise<void> {
		vehicle.location = location;
		this.updateOne(vehicle);
	}
}
