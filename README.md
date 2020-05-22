# package-async

![Github Release](https://img.shields.io/github/v/release/wildpeaks/package-async.svg?label=Release&logo=github&logoColor=eceff4&colorA=4c566a&colorB=11abfb)

**Loops for async functions**.

Installation:

	npm install @wildpeaks/async


-------------------------------------------------------------------------------

## asyncArrayMap

Similar to [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
except the mapper function should return a Promise, and it can optionally limit the number of Promises running at once
(e.g. useful for calling a rate-limited API for example).

Syntax:

````ts
type CallbackType = (value: any, index: number, array: any[]) => Promise;

function asyncArrayMap(
	array: any[],
	callback: CallbackType,
	limit: number
): Promise<any[]>
````

Parameters:
 - **array**: Arbitrary list of values to process
 - **callback**: Async function that produces an element of the new Array
 - **limit**: Number of promises that can run at once (`0` = no limit, `1` = only one at a time, `2` = two at once maximum, etc…)


### Examples

Process all values in parallel (default, limit 0):
````js
const {asyncArrayMap} = require('@wildpeaks/async');

const words = ['Aaa', 'Bbb', 'Ccc'];
const translations = await asyncArrayMap(words, async word => {
	const translated = await translate(word);
	return word + ' translates to ' + translated;
});
````


Only one at the time, one after the other (limit 1):

````js
async function mapWord(word){
	const translated = await translate(word);
	return word + ' translates to ' + translated;
}

const {asyncArrayMap} = require('@wildpeaks/async');
const translations = await asyncArrayMap(['Aaa', 'Bbb', 'Ccc'], mapWord, 1);
````

Up to 5 at the same time in parallel (limit 5):

````js
async function mapWord(word){
	const translated = await translate(word);
	return word + ' translates to ' + translated;
}

const {asyncArrayMap} = require('@wildpeaks/async');
const translations = await asyncArrayMap(['Aaa', 'Bbb', 'Ccc'], mapWord, 5);
````

-------------------------------------------------------------------------------

