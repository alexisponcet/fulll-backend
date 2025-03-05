import { Location } from '@/lib/domain/models/location.model.js';
import { Vehicle } from '@/lib/domain/models/vehicle.entity.js';

export interface VehicleCommandsPort {
	createVehicle(vehicle: Vehicle): Promise<Vehicle>;
	parkVehicleAt(vehicle: Vehicle, location: Location): Promise<void>;
}
