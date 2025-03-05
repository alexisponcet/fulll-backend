import { Fleet } from '@/lib/domain/models/fleet.entity.js';
import { Vehicle } from '@/lib/domain/models/vehicle.entity.js';

export interface FleetQueriesPort {
	findFleetById(id: string): Promise<Fleet | undefined>;
	hasVehicle(fleet: Fleet, vehicle: Vehicle): Promise<boolean>;
}
