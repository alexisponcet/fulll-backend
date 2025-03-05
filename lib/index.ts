import { CreateFleetCommand } from './application/commands/create-fleet.command.js';
import { CreateVehicleCommand } from './application/commands/create-vehicle.command.js';
import { ParkVehicleAtCommand } from './application/commands/park-vehicle-at.command.js';
import { RegisterVehicleCommand } from './application/commands/register-vehicle.command.js';
import { HasVehicleQuery } from './application/queries/has-vehicle.query.js';
import { IsParkedAtQuery } from './application/queries/is-parked-at.query.js';
import { FleetCommandsPort } from './domain/ports/fleet/fleet-commands.port.js';
import { FleetQueriesPort } from './domain/ports/fleet/fleet-queries.port.js';
import { VehicleCommandsPort } from './domain/ports/vehicle/vehicle-commands.port.js';
import { VehicleQueriesPort } from './domain/ports/vehicle/vehicle-queries.port.js';
import { FleetRepositoryInMemory } from './infrastructure/repositories/in-memory/fleet.repository.js';
import { VehicleRepositoryInMemory } from './infrastructure/repositories/in-memory/vehicle.repository.js';

export { SQLiteAdapter as VehicleFleetSQLiteAdapter } from './infrastructure/adapters/sqlite.adapter.js';
export { Location as VehicleFleetLocation } from './domain/models/location.model.js';
export { LicensePlateGenerator as VehicleFleetLicensePlateGenerator } from './utils/license-plate-generator.js';
export interface IVehicleFleetRepositories {
	fleetRepository: FleetCommandsPort & FleetQueriesPort;
	vehicleRepository: VehicleCommandsPort & VehicleQueriesPort;
}

export interface IVehicleFleetActions {
	commands: {
		createFleetCommand: CreateFleetCommand;
		createVehicleCommand: CreateVehicleCommand;
		parkVehicleAtCommand: ParkVehicleAtCommand;
		registerVehicleCommand: RegisterVehicleCommand;
	};
	queries: {
		hasVehicleQuery: HasVehicleQuery;
		isParkedAtQuery: IsParkedAtQuery;
	};
}

export default (
	{ fleetRepository, vehicleRepository }: IVehicleFleetRepositories = {
		fleetRepository: new FleetRepositoryInMemory(),
		vehicleRepository: new VehicleRepositoryInMemory()
	}
): IVehicleFleetActions => ({
	commands: {
		createFleetCommand: new CreateFleetCommand(fleetRepository),
		createVehicleCommand: new CreateVehicleCommand(vehicleRepository),
		parkVehicleAtCommand: new ParkVehicleAtCommand(vehicleRepository),
		registerVehicleCommand: new RegisterVehicleCommand(fleetRepository, vehicleRepository)
	},
	queries: {
		hasVehicleQuery: new HasVehicleQuery(fleetRepository, vehicleRepository),
		isParkedAtQuery: new IsParkedAtQuery(vehicleRepository)
	}
});
