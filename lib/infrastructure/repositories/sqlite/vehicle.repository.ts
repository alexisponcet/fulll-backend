import { Database } from 'sqlite';
import { Vehicle } from '@/lib/domain/models/vehicle.entity.js';
import { Location } from '@/lib/domain/models/location.model.js';
import { VehicleCommandsPort } from '@/lib/domain/ports/vehicle/vehicle-commands.port.js';
import { VehicleQueriesPort } from '@/lib/domain/ports/vehicle/vehicle-queries.port.js';

export class VehicleRepositorySQLite implements VehicleCommandsPort, VehicleQueriesPort {
	constructor(private readonly database: Database) {}

	async createVehicle(vehicle: Vehicle): Promise<Vehicle> {
		await this.database.run('INSERT INTO vehicle (id) VALUES (?)', vehicle.id);
		return vehicle;
	}

	async findVehicleByPlateNumber(plateNumber: string): Promise<Vehicle | undefined> {
		return this.database.get<Vehicle | undefined>(
			'SELECT * FROM vehicle WHERE id = ?',
			plateNumber
		);
	}

	async isParkedAt(vehicle: Vehicle, location: Location): Promise<boolean> {
		return !!(
			await this.database.all(
				`SELECT * FROM vehicle WHERE id = ? AND json_extract(location, '$.lat') = ? AND json_extract(location, '$.lng') = ? AND json_extract(location, '$.alt') ${location.alt ? '= ?' : 'IS NULL'}`,
				[vehicle.id, location.lat, location.lng, location.alt]
			)
		).length;
	}

	async parkVehicleAt(vehicle: Vehicle, location: Location): Promise<void> {
		await this.database.run('UPDATE vehicle SET location = ? WHERE id = ?', [
			JSON.stringify(location),
			vehicle.id
		]);
	}
}
