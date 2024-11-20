import {getHaversine, getEuclidean, buildEuclidean} from '../src';
import {describe, expect, it} from 'vitest';
import {performance} from 'perf_hooks';
//

const stockholm = {lat: 59.3038451, lon: 18.0037564};
const upsala = {lat: 59.8332537, lon: 17.5760483};

function runPerformanceTest<T extends () => unknown>(callback: T): ReturnType<T> {
	const start = performance.now();
	const out = callback();
	const end = performance.now();
	console.log(`Time taken to execute add function is ${(end - start).toString()}ms.`);
	return out as ReturnType<T>;
}

describe('Test boolean parser', function () {
	it('should parse values', function () {
		expect(runPerformanceTest(() => getHaversine(stockholm, upsala))).to.equal(63605.22284433383);
		expect(runPerformanceTest(() => getEuclidean(stockholm, upsala))).to.equal(63660.58001869566);
		const eucStockholm = buildEuclidean(stockholm);
		expect(runPerformanceTest(() => eucStockholm(upsala))).to.equal(63660.58001869566);
	});
});
