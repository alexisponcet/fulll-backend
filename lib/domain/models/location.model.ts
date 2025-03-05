export class Location {
	readonly lat: number;
	readonly lng: number;
	readonly alt?: number;

	constructor(lat: number, lng: number, alt?: number) {
		this.lat = lat;
		this.lng = lng;
		this.alt = alt;
	}

	public isEqualWith(other: Location): boolean {
		return this.lat === other.lat && this.lng === other.lng && this.alt === other.alt;
	}

	public toString(): string {
		return `[${[this.lat, this.lng, this.alt].filter((coordinate) => !!coordinate).join(', ')}]`;
	}
}
