import { Repository } from './_repository.js';
import { Fleet } from '@/lib/domain/models/fleet.entity.js';
import { Vehicle } from '@/lib/domain/models/vehicle.entity.js';
import { FleetCommandsPort } from '@/lib/domain/ports/fleet/fleet-commands.port.js';
import { FleetQueriesPort } from '@/lib/domain/ports/fleet/fleet-queries.port.js';

export class FleetRepositoryInMemory
	extends Repository<Fleet>
	implements FleetCommandsPort, FleetQueriesPort
{
	async createFleet(fleet: Fleet): Promise<Fleet> {
		return this.insertOne(fleet);
	}

	async findFleetById(id: string): Promise<Fleet | undefined> {
		return this.findById(id);
	}

	async hasVehicle(fleet: Fleet, vehicle: Vehicle): Promise<boolean> {
		return fleet.vehicles.has(vehicle);
	}

	async registerVehicle(fleet: Fleet, vehicle: Vehicle): Promise<void> {
		fleet.vehicles.add(vehicle);
		this.updateOne(fleet);
	}
}
