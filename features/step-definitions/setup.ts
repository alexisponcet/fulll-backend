import path from 'path';
import { fileURLToPath } from 'url';
import { After, Before } from '@cucumber/cucumber';
import bootVehicleFleetLibrary, {
	IVehicleFleetActions,
	IVehicleFleetRepositories,
	VehicleFleetLicensePlateGenerator,
	VehicleFleetSQLiteAdapter
} from '@/lib/index.js';
import { SQLiteAdapter } from '@/lib/infrastructure/adapters/sqlite.adapter.js';
import 'dotenv/config';

let database: SQLiteAdapter;
let repositories: IVehicleFleetRepositories;
const databasePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'e2e.db');

Before(async () => {
	console.log('\x1b[32m%s\x1b[0m', 'Starting new scenario ...');
	if (process.env.DATABASE_ADAPTER === 'SQLITE') {
		database = new VehicleFleetSQLiteAdapter();
		repositories = await database.open(databasePath, false);
	}
	actions = bootVehicleFleetLibrary(repositories);
});

After(async () => {
	if (process.env.DATABASE_ADAPTER === 'SQLITE') {
		await database.close();
		database.delete(databasePath);
	}
});

export const vehiclePlateNumber: string = VehicleFleetLicensePlateGenerator.generatePlateNumber();
export let actions: IVehicleFleetActions;
