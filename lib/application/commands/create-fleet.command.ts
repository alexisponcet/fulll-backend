import { Fleet } from '@/lib/domain/models/fleet.entity.js';
import { FleetCommandsPort } from '@/lib/domain/ports/fleet/fleet-commands.port.js';

/**
 * Command for creating a new fleet.
 * If the fleet already exists, an error will be thrown.
 */
export class CreateFleetCommand {
	constructor(private readonly fleetRepository: FleetCommandsPort) {}

	public async execute(fleetId: string): Promise<void> {
		try {
			await this.fleetRepository.createFleet(new Fleet(fleetId));
		} catch {
			throw new Error(`Fleet #${fleetId} already exists !`);
		}
	}
}
