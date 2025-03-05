import { IEntity } from '@/lib/domain/models/entity.js';

/*
 * Simulates a data table entity.
 */
export class Repository<T extends IEntity> {
	protected objects: Map<string, T> = new Map();

	public findById(id: string): T | undefined {
		return this.objects.get(id);
	}

	public insertOne(object: T): T {
		if (this.findById(object.id)) throw new Error(`Object #${object.id} already exists !`);
		this.objects.set(object.id, object);
		return object;
	}

	public updateOne(object: T): T {
		this.objects.set(object.id, object);
		return object;
	}
}
