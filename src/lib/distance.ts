import {type BubbleLocationType} from '../types/Location';

const R = 6378.137;
const PI_360 = Math.PI / 360;
const decLen = 110.25; // 1 degree of latitude is 110.25 km
const kRad = Math.PI / 180;

const toRad = (n: number) => (n * Math.PI) / 180;

export function getHaversine(loc1: BubbleLocationType, loc2: BubbleLocationType): number {
	const R = 6371e3; // metres
	const φ1 = (loc1.lat * Math.PI) / 180; // φ, λ in radians
	const φ2 = (loc2.lat * Math.PI) / 180;
	const Δφ = ((loc2.lat - loc1.lat) * Math.PI) / 180;
	const Δλ = ((loc2.lon - loc1.lon) * Math.PI) / 180;

	const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	return R * c; // in metres
}
/**
 *
 * https://jonisalonen.com/2014/computing-distance-between-coordinates-can-be-simple-and-fast/
 */
export function getEuclidean(a: BubbleLocationType, b: BubbleLocationType): number {
	const kx = Math.cos(a.lat * kRad) * 111.321;
	const dx = (a.lon - b.lon) * kx;
	const dy = (a.lat - b.lat) * 111.139;
	return Math.sqrt(dx * dx + dy * dy) * 1000;
}

export function buildEuclidean(a: BubbleLocationType) {
	const kx = Math.cos(a.lat * kRad) * 111.321;
	return function (b: BubbleLocationType) {
		const dx = (a.lon - b.lon) * kx;
		const dy = (a.lat - b.lat) * 111.139;
		return Math.sqrt(dx * dx + dy * dy) * 1000;
	};
}
