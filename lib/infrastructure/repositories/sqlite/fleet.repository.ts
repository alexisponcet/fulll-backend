import { Database } from 'sqlite';
import { Fleet } from '@/lib/domain/models/fleet.entity.js';
import { Vehicle } from '@/lib/domain/models/vehicle.entity.js';
import { FleetCommandsPort } from '@/lib/domain/ports/fleet/fleet-commands.port.js';
import { FleetQueriesPort } from '@/lib/domain/ports/fleet/fleet-queries.port.js';

export class FleetRepositorySQLite implements FleetCommandsPort, FleetQueriesPort {
	constructor(private readonly database: Database) {}

	async createFleet(fleet: Fleet): Promise<Fleet> {
		await this.database.run('INSERT INTO fleet (id) VALUES (?)', fleet.id);
		return fleet;
	}

	async findFleetById(id: string): Promise<Fleet | undefined> {
		return this.database.get<Fleet | undefined>('SELECT * FROM fleet WHERE id = ?', id);
	}

	async hasVehicle(fleet: Fleet, vehicle: Vehicle): Promise<boolean> {
		return !!(
			await this.database.all(
				'SELECT * from fleet_vehicle WHERE fleet_id = ? AND vehicle_id = ?',
				[fleet.id, vehicle.id]
			)
		).length;
	}

	async registerVehicle(fleet: Fleet, vehicle: Vehicle): Promise<void> {
		await this.database.run('INSERT INTO fleet_vehicle (fleet_id, vehicle_id) VALUES (?, ?)', [
			fleet.id,
			vehicle.id
		]);
	}
}
