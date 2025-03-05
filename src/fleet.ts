import { Command } from 'commander';
import VehicleFleetContext, { IVehicleFleetRepositories } from '@/lib/index.js';
import { runCreate } from './commands/create.js';
import { runLocalizeVehicle } from './commands/localize-vehicle.js';
import { runRegisterVehicle } from './commands/register-vehicle.js';
import { SQLiteAdapter } from '@/lib/infrastructure/adapters/sqlite.adapter.js';
import 'dotenv/config';

(async () => {
	/*
	 * Initialize the infrastructure.
	 */
	let database: SQLiteAdapter | null = null;
	let repositories: IVehicleFleetRepositories;
	if (process.env.DATABASE_ADAPTER === 'SQLITE') {
		database = new SQLiteAdapter();
		repositories = await database.open(process.env.DATABASE_PATH);
	}

	/**
	 * The vehicle fleet parking management command line interface implementation.
	 */
	const program = new Command()
		.version('1.0.0')
		.summary('🎅 A special Vehicle Fleet Parking Management application 🎅')
		.description(
			'The vehicle fleet parking management allows to create, register and localize a vehicle into a fleet'
		)
		.showHelpAfterError()
		.configureOutput({
			outputError: (str, write) => write(`\x1b[31m${str}\x1b[0m`)
		});

	program
		.command('create')
		.argument('<fleetId>', 'The corresponding id of the fleet')
		.action((fleetId) => runCreate(VehicleFleetContext(repositories), fleetId));

	program
		.command('register-vehicle')
		.argument('<fleetId>', 'The corresponding id of the fleet')
		.argument('<vehiclePlateNumber>', 'The corresponding plate number of the vehicle')
		.action((fleetId, vehiclePlateNumber) =>
			runRegisterVehicle(VehicleFleetContext(repositories), fleetId, vehiclePlateNumber)
		);

	program
		.command('localize-vehicle')
		.argument('<fleetId>', 'The corresponding id of the fleet')
		.argument('<vehiclePlateNumber>', 'The corresponding plate number of the vehicle')
		.argument('<lat>', 'The latitude of your vehicle location')
		.argument('<lng>', 'The longitude of your vehicle location')
		.argument('[alt]', 'The altitude of your vehicle location')
		.action((fleetId, vehiclePlateNumber, lat, lng, alt) =>
			runLocalizeVehicle(
				VehicleFleetContext(repositories),
				fleetId,
				vehiclePlateNumber,
				lat,
				lng,
				alt
			)
		);

	try {
		await program.parseAsync(process.argv);
	} finally {
		if (database) await database.close();
	}
})();
