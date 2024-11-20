import {type BubbleLocationType} from '../types/Location';
import {type EventEmitter} from 'events';

export type BubbleEventUpdate = {
	location: BubbleLocationType;
};

export interface IBubbleItemEventMap {
	update: [BubbleEventUpdate];
}

export type IBubbleItemEventEmitter = EventEmitter<IBubbleItemEventMap>;

export interface IBubbleItem {
	readonly id: string;
	location: Readonly<BubbleLocationType>;
	getDistanceTo(item: BubbleLocationType): number;
}

export type IBubbleItemInstance = IBubbleItem & IBubbleItemEventEmitter;
