import {type IBubbleItemEventMap, type IBubbleItemInstance} from './interfaces/IBubbleItem';
import {type BubbleLocationType} from './types/Location';
import {buildEuclidean} from './lib/distance';
import {EventEmitter} from 'events';

export abstract class BubbleItem extends EventEmitter<IBubbleItemEventMap> implements IBubbleItemInstance {
	private handleDistance: ((loc: BubbleLocationType) => number) | undefined;
	protected _location: BubbleLocationType | undefined;
	public abstract readonly id: string;

	public get location(): Readonly<BubbleLocationType> {
		if (!this._location) {
			throw new Error('Location is not set');
		}
		return this._location;
	}

	public set location(loc: BubbleLocationType) {
		this._location = loc;
		this.handleDistance = buildEuclidean(loc);
	}

	public getDistanceTo(loc: BubbleLocationType): number {
		if (!this.handleDistance) {
			throw new Error('Location is not set');
		}
		return this.handleDistance(loc);
	}
}
