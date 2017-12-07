'use strict';
const pLimit = require('p-limit');


/**
 * Processes an array of values, using promises.
 * @param {Array} array  Arbitrary list of values to process
 * @param {(value: any, index: number, array: any[]) => Promise<any>} callback  Async function that produces an element of the new Array
 * @param {number} limit  Number of promises that can run at once (`0` = no limit, `1` = only one at a time, `2` = two at once maximum, etc…)
 * @returns {Promise<any[]>}
 */
function asyncArrayMap(array, callback, limit = 0){
	let result;
	if (Array.isArray(array) && (typeof callback === 'function') && (typeof limit === 'number') && !isNaN(limit)){
		let promises = [];
		if (limit > 0){
			const helper = pLimit(limit);
			promises = array.map((value, index, arrayRef) => helper(() => callback(value, index, arrayRef)));
		} else {
			promises = array.map(callback);
		}
		result = Promise.all(promises);
	} else {
		result = Promise.reject(new Error('Invalid parameter'));
	}
	return result;
}


module.exports.asyncArrayMap = asyncArrayMap;

