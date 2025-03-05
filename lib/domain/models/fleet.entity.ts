import { IEntity } from './entity.js';
import { Vehicle } from './vehicle.entity.js';

export class Fleet implements IEntity {
	public readonly id: string;
	public readonly vehicles: Set<Vehicle>;

	constructor(fleetId: string) {
		this.id = fleetId;
		this.vehicles = new Set();
	}
}
