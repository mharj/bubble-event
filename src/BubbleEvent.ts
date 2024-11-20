import {EventEmitter} from 'events';
import {IBubbleItemInstance} from './interfaces/IBubbleItem';

interface IDoubleBubble<T extends IBubbleItemInstance = IBubbleItemInstance> {
	__fast: Set<IDoubleBubble>;
	__slow: Set<IDoubleBubble>;
	instance: T;
}

function bubleNormalize(value: number): 'fast' | 'slow' | undefined {
	if (value < 1000) {
		return 'fast';
	}
	if (value < 5000) {
		return 'slow';
	}
	return undefined;
}

export class BubbleEvent<T extends IBubbleItemInstance> {
	private items = new Map<string, IDoubleBubble<T>>();

	public addItem(instance: T) {
		const item = {__fast: new Set<IDoubleBubble>(), __slow: new Set<IDoubleBubble>(), instance};
		this.runInitialBubble(item);
		this.items.set(instance.id, item);
	}

	public removeItem(item: T) {
		this.items.delete(item.id);
	}

	private runInitialBubble(item: IDoubleBubble<T>) {
		for (const other of this.items.values()) {
			// link the two items if they are close enough
			this.runDistanceUpdate(item, other);
		}
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

	private runDistanceUpdate(item1: IDoubleBubble<T>, item2: IDoubleBubble<T>) {
		// link the two items if they are close enough
		switch (bubleNormalize(item1.instance.getDistanceTo(item2.instance.location))) {
			case 'fast':
				item1.__fast.add(item2);
				item2.__fast.add(item1);
				item1.__slow.delete(item2);
				item2.__slow.delete(item1);
				break;
			case 'slow':
				item1.__slow.add(item2);
				item2.__slow.add(item1);
				item1.__slow.delete(item2);
				item2.__slow.delete(item1);
				break;
			case undefined:
				item1.__fast.delete(item2);
				item2.__fast.delete(item1);
				item1.__slow.delete(item2);
				item2.__slow.delete(item1);
		}
	}
}
