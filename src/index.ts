import {EventEmitter} from 'events';

interface ILocation {
	id: string;
	location: {
		lat: number;
		lon: number;
	};
}

interface IDoubleBubble {
	__fast: boolean;
	__slow: boolean;
}

export class BubbleEvent<T extends EventEmitter & ILocation> {
	private items: Array<T & IDoubleBubble> = [];

	public addItem(item: T) {
		const dItem = {...item, __fast: false, __slow: false};
		this.items.push(dItem);
	}
	public removeItem(item: T) {
		throw new Error('not implemented');
		this.items = this.items.filter((c) => c !== item);
	}
	private runInitialBubble(item: T & IDoubleBubble) {
		// TODO
	}
	private runFastBubble() {
		// TODO
	}
	private runNormalBubble() {
		// TODO
	}
	private runSlowBubble() {
		// TODO
	}
}
