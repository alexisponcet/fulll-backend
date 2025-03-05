import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';
import { FleetRepositorySQLite } from '@/lib/infrastructure/repositories/sqlite/fleet.repository.js';
import { VehicleRepositorySQLite } from '@/lib/infrastructure/repositories/sqlite/vehicle.repository.js';
import { IVehicleFleetRepositories } from '@/lib/index.js';
import fs from 'fs';

/**
 * A class responsible for interacting with an SQLite database.
 */
export class SQLiteAdapter {
	private readonly database!: Database;

	public close = async () => {
		console.log('Closing the database ...');
		await this.database.close();
		console.log('The database has been closed !\n');
	};

	public delete = (databasePath: string): void => {
		if (!fs.existsSync(databasePath)) return;

		console.log('Deleting existing database ...');
		fs.unlinkSync(databasePath);
		console.log('The database has been deleted !\n\n');
	};

	public open = async (
		databasePath: string = 'sqlite.db',
		useCache: boolean = true
	): Promise<IVehicleFleetRepositories> => {
		try {
			console.log('Connecting to the database ...');
			(this.database as Database) = await open<sqlite3.Database, sqlite3.Statement>({
				filename: databasePath,
				driver: useCache ? sqlite3.cached.Database : sqlite3.Database
			});
			console.log('Connection to the database has been successfully established !\n');
		} catch {
			throw new Error('Can not connect to the database !');
		}

		await this.seed();

		return {
			fleetRepository: new FleetRepositorySQLite(this.database),
			vehicleRepository: new VehicleRepositorySQLite(this.database)
		};
	};

	private seed = async (): Promise<void> => {
		console.log('Seeding the database if needed ...');
		await this.database!.run('CREATE TABLE IF NOT EXISTS fleet (id TEXT PRIMARY KEY)');
		await this.database!.run(
			'CREATE TABLE IF NOT EXISTS vehicle (id TEXT PRIMARY KEY, location TEXT)'
		);
		await this.database!.run(
			'CREATE TABLE IF NOT EXISTS fleet_vehicle (fleet_id TEXT, vehicle_id TEXT, FOREIGN KEY (fleet_id) REFERENCES fleet(id), FOREIGN KEY (vehicle_id) REFERENCES vehicle(id), PRIMARY KEY (fleet_id, vehicle_id))'
		);
		console.log(
			'The database has been initialized and is now ready to process your requests !\n'
		);
	};
}
