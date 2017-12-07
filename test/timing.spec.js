/* eslint-env jasmine, shared-node-browser */
/* eslint-disable require-await */
'use strict';
const {asyncArrayMap} = require('../src/async.js');

const delays = {
	Aaa: 100,
	Bbb: 300,
	Ccc: 200,
	Ddd: 10,
	Eee: 150
};
function delayedResolve(text){
	return new Promise(resolve => {
		const delay = (text in delays) ? delays[text] : 0;
		setTimeout(
			() => {
				const value = String(text).toUpperCase();
				resolve(value);
			},
			delay
		);
	});
}


// Global timestamp call:    0    0    0    0    0
//                           Aaa  Bbb  Ccc  Ddd  Eee
// Global timestamp resolve: 10   100  150  200  300
//                           Ddd  Aaa  Eee  Ccc  Bbb
it('Limit 0', () => new Promise((resolve, reject) => {
	const callback = jasmine.createSpy('callback', delayedResolve).and.callThrough();
	expect(callback).toHaveBeenCalledTimes(0);
	asyncArrayMap(['Aaa', 'Bbb', 'Ccc', 'Ddd', 'Eee'], callback, 0);

	const calls = {};
	calls['0ms'] = callback.calls.count();
	setTimeout(() => {
		calls['50ms'] = callback.calls.count();
	}, 50);
	setTimeout(() => {
		calls['175ms'] = callback.calls.count();
	}, 175);
	setTimeout(() => {
		calls['250ms'] = callback.calls.count();
	}, 250);
	setTimeout(() => {
		calls['500ms'] = callback.calls.count();
	}, 500);
	setTimeout(() => {
		calls['850ms'] = callback.calls.count();
	}, 850);

	setTimeout(() => {
		let error = false;
		try {
			expect(calls).toEqual({'0ms': 5, '50ms': 5, '175ms': 5, '250ms': 5, '500ms': 5, '850ms': 5});
			expect(callback).toHaveBeenCalledTimes(5);
			expect(callback.calls.argsFor(0)).toEqual(['Aaa', 0, ['Aaa', 'Bbb', 'Ccc', 'Ddd', 'Eee']]);
			expect(callback.calls.argsFor(1)).toEqual(['Bbb', 1, ['Aaa', 'Bbb', 'Ccc', 'Ddd', 'Eee']]);
			expect(callback.calls.argsFor(2)).toEqual(['Ccc', 2, ['Aaa', 'Bbb', 'Ccc', 'Ddd', 'Eee']]);
			expect(callback.calls.argsFor(3)).toEqual(['Ddd', 3, ['Aaa', 'Bbb', 'Ccc', 'Ddd', 'Eee']]);
			expect(callback.calls.argsFor(4)).toEqual(['Eee', 4, ['Aaa', 'Bbb', 'Ccc', 'Ddd', 'Eee']]);
		} catch(e){
			error = e;
		}
		if (error === false){
			resolve();
		} else {
			reject(error);
		}
	}, 1000);
}));


// Global timestamp call:    0    100  400  600  610
//                           Aaa  Ccc  Bbb  Ddd  Eee
// Global timestamp resolve: 100  400  600  610  760
//                           Aaa  Ccc  Bbb  Ddd  Eee
it('Limit 1', () => new Promise((resolve, reject) => {
	const callback = jasmine.createSpy('callback', delayedResolve).and.callThrough();
	expect(callback).toHaveBeenCalledTimes(0);
	asyncArrayMap(['Aaa', 'Bbb', 'Ccc', 'Ddd', 'Eee'], callback, 1);

	const calls = {};
	calls['0ms'] = callback.calls.count();
	setTimeout(() => {
		calls['50ms'] = callback.calls.count();
	}, 50);
	setTimeout(() => {
		calls['175ms'] = callback.calls.count();
	}, 175);
	setTimeout(() => {
		calls['250ms'] = callback.calls.count();
	}, 250);
	setTimeout(() => {
		calls['500ms'] = callback.calls.count();
	}, 500);
	setTimeout(() => {
		calls['850ms'] = callback.calls.count();
	}, 850);

	setTimeout(() => {
		let error = false;
		try {
			expect(calls).toEqual({'0ms': 1, '50ms': 1, '175ms': 2, '250ms': 2, '500ms': 3, '850ms': 5});
			expect(callback).toHaveBeenCalledTimes(5);
			expect(callback.calls.argsFor(0)).toEqual(['Aaa', 0, ['Aaa', 'Bbb', 'Ccc', 'Ddd', 'Eee']]);
			expect(callback.calls.argsFor(1)).toEqual(['Bbb', 1, ['Aaa', 'Bbb', 'Ccc', 'Ddd', 'Eee']]);
			expect(callback.calls.argsFor(2)).toEqual(['Ccc', 2, ['Aaa', 'Bbb', 'Ccc', 'Ddd', 'Eee']]);
			expect(callback.calls.argsFor(3)).toEqual(['Ddd', 3, ['Aaa', 'Bbb', 'Ccc', 'Ddd', 'Eee']]);
			expect(callback.calls.argsFor(4)).toEqual(['Eee', 4, ['Aaa', 'Bbb', 'Ccc', 'Ddd', 'Eee']]);
		} catch(e){
			error = e;
		}
		if (error === false){
			resolve();
		} else {
			reject(error);
		}
	}, 1000);
}));


// Global timestamp call:    0    0    0    100  110
//                           Aaa  Bbb  Ccc  Ddd  Eee
// Global timestamp resolve: 100  110  200  300  260
//                           Aaa  Ddd  Ccc  Bbb  Eee
it('Limit 3', () => new Promise((resolve, reject) => {
	const callback = jasmine.createSpy('callback', delayedResolve).and.callThrough();
	expect(callback).toHaveBeenCalledTimes(0);
	asyncArrayMap(['Aaa', 'Bbb', 'Ccc', 'Ddd', 'Eee'], callback, 3);

	const calls = {};
	calls['0ms'] = callback.calls.count();
	setTimeout(() => {
		calls['50ms'] = callback.calls.count();
	}, 50);
	setTimeout(() => {
		calls['175ms'] = callback.calls.count();
	}, 175);
	setTimeout(() => {
		calls['250ms'] = callback.calls.count();
	}, 250);
	setTimeout(() => {
		calls['500ms'] = callback.calls.count();
	}, 500);
	setTimeout(() => {
		calls['850ms'] = callback.calls.count();
	}, 850);

	setTimeout(() => {
		let error = false;
		try {
			expect(calls).toEqual({'0ms': 3, '50ms': 3, '175ms': 5, '250ms': 5, '500ms': 5, '850ms': 5});
			expect(callback).toHaveBeenCalledTimes(5);
			expect(callback.calls.argsFor(0)).toEqual(['Aaa', 0, ['Aaa', 'Bbb', 'Ccc', 'Ddd', 'Eee']]);
			expect(callback.calls.argsFor(1)).toEqual(['Bbb', 1, ['Aaa', 'Bbb', 'Ccc', 'Ddd', 'Eee']]);
			expect(callback.calls.argsFor(2)).toEqual(['Ccc', 2, ['Aaa', 'Bbb', 'Ccc', 'Ddd', 'Eee']]);
			expect(callback.calls.argsFor(3)).toEqual(['Ddd', 3, ['Aaa', 'Bbb', 'Ccc', 'Ddd', 'Eee']]);
			expect(callback.calls.argsFor(4)).toEqual(['Eee', 4, ['Aaa', 'Bbb', 'Ccc', 'Ddd', 'Eee']]);
		} catch(e){
			error = e;
		}
		if (error === false){
			resolve();
		} else {
			reject(error);
		}
	}, 1000);
}));

