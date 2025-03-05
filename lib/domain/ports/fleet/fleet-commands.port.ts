import { Fleet } from '@/lib/domain/models/fleet.entity.js';
import { Vehicle } from '@/lib/domain/models/vehicle.entity.js';

export interface FleetCommandsPort {
	createFleet(fleet: Fleet): Promise<Fleet>;
	registerVehicle(fleet: Fleet, vehicle: Vehicle): Promise<void>;
}
