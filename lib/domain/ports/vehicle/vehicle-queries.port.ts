import { Location } from '@/lib/domain/models/location.model.js';
import { Vehicle } from '@/lib/domain/models/vehicle.entity.js';

export interface VehicleQueriesPort {
	findVehicleByPlateNumber(plateNumber: string): Promise<Vehicle | undefined>;
	isParkedAt(vehicle: Vehicle, location: Location): Promise<boolean>;
}
