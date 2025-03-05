import { IEntity } from './entity.js';
import { Location } from './location.model.js';

export class Vehicle implements IEntity {
	public readonly id: string;
	private _location?: Location;

	constructor(plateNumber: string) {
		this.id = plateNumber;
	}

	public get location(): Location | undefined {
		return this._location;
	}

	public set location(location: Location | undefined) {
		this._location = location;
	}
}
