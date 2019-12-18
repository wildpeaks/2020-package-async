/* eslint-env jasmine, shared-node-browser */
/* eslint-disable require-await */
"use strict";
const {asyncArrayMap} = require("../src/async.js");

/**
 * @param {*} text
 */
async function makeUppercase(text) {
	return text.toUpperCase();
}

describe("Invalid values", () => {
	it("undefined", async () => {
		let error = false;
		let results = [];
		try {
			results = await asyncArrayMap(undefined, makeUppercase);
		} catch (e) {
			error = e.message;
		}
		expect(results).toEqual([]);
		expect(error).toBe("Invalid parameter");
	});

	it("true", async () => {
		let error = false;
		let results = [];
		try {
			results = await asyncArrayMap(true, makeUppercase);
		} catch (e) {
			error = e.message;
		}
		expect(results).toEqual([]);
		expect(error).toBe("Invalid parameter");
	});

	it("false", async () => {
		let error = false;
		let results = [];
		try {
			results = await asyncArrayMap(false, makeUppercase);
		} catch (e) {
			error = e.message;
		}
		expect(results).toEqual([]);
		expect(error).toBe("Invalid parameter");
	});

	it('"0123"', async () => {
		let error = false;
		let results = [];
		try {
			results = await asyncArrayMap("0123", makeUppercase);
		} catch (e) {
			error = e.message;
		}
		expect(results).toEqual([]);
		expect(error).toBe("Invalid parameter");
	});

	it("null", async () => {
		let error = false;
		let results = [];
		try {
			results = await asyncArrayMap(null, makeUppercase);
		} catch (e) {
			error = e.message;
		}
		expect(results).toEqual([]);
		expect(error).toBe("Invalid parameter");
	});

	it("{}", async () => {
		let error = false;
		let results = [];
		try {
			results = await asyncArrayMap({}, makeUppercase);
		} catch (e) {
			error = e.message;
		}
		expect(results).toEqual([]);
		expect(error).toBe("Invalid parameter");
	});

	it(`{0: 'aaa', 1: 'bbb'}`, async () => {
		let error = false;
		let results = [];
		try {
			results = await asyncArrayMap({0: "aaa", 1: "bbb"}, makeUppercase);
		} catch (e) {
			error = e.message;
		}
		expect(results).toEqual([]);
		expect(error).toBe("Invalid parameter");
	});

	it("new Set()", async () => {
		let error = false;
		let results = [];
		try {
			results = await asyncArrayMap(new Set(), makeUppercase);
		} catch (e) {
			error = e.message;
		}
		expect(results).toEqual([]);
		expect(error).toBe("Invalid parameter");
	});

	it("new Set()", async () => {
		let error = false;
		let results = [];
		try {
			results = await asyncArrayMap(new Set(), makeUppercase);
		} catch (e) {
			error = e.message;
		}
		expect(results).toEqual([]);
		expect(error).toBe("Invalid parameter");
	});

	it("new Map()", async () => {
		let error = false;
		let results = [];
		try {
			results = await asyncArrayMap(new Map(), makeUppercase);
		} catch (e) {
			error = e.message;
		}
		expect(results).toEqual([]);
		expect(error).toBe("Invalid parameter");
	});

	it("new WeakMap()", async () => {
		let error = false;
		let results = [];
		try {
			results = await asyncArrayMap(new WeakMap(), makeUppercase);
		} catch (e) {
			error = e.message;
		}
		expect(results).toEqual([]);
		expect(error).toBe("Invalid parameter");
	});
});

describe("Invalid callback", () => {
	it("undefined", async () => {
		let error = false;
		let results = [];
		try {
			results = await asyncArrayMap(["Aaa", "Bbb", "Ccc"], undefined);
		} catch (e) {
			error = e.message;
		}
		expect(results).toEqual([]);
		expect(error).toBe("Invalid parameter");
	});

	it("true", async () => {
		let error = false;
		let results = [];
		try {
			results = await asyncArrayMap(["Aaa", "Bbb", "Ccc"], true);
		} catch (e) {
			error = e.message;
		}
		expect(results).toEqual([]);
		expect(error).toBe("Invalid parameter");
	});

	it("false", async () => {
		let error = false;
		let results = [];
		try {
			results = await asyncArrayMap(["Aaa", "Bbb", "Ccc"], false);
		} catch (e) {
			error = e.message;
		}
		expect(results).toEqual([]);
		expect(error).toBe("Invalid parameter");
	});

	it("null", async () => {
		let error = false;
		let results = [];
		try {
			results = await asyncArrayMap(["Aaa", "Bbb", "Ccc"], null);
		} catch (e) {
			error = e.message;
		}
		expect(results).toEqual([]);
		expect(error).toBe("Invalid parameter");
	});

	it("{}", async () => {
		let error = false;
		let results = [];
		try {
			results = await asyncArrayMap(["Aaa", "Bbb", "Ccc"], {});
		} catch (e) {
			error = e.message;
		}
		expect(results).toEqual([]);
		expect(error).toBe("Invalid parameter");
	});

	it('"function"', async () => {
		let error = false;
		let results = [];
		try {
			results = await asyncArrayMap(["Aaa", "Bbb", "Ccc"], "function");
		} catch (e) {
			error = e.message;
		}
		expect(results).toEqual([]);
		expect(error).toBe("Invalid parameter");
	});
});

describe("Invalid limit", () => {
	it("NaN", async () => {
		let error = false;
		let results = [];
		try {
			results = await asyncArrayMap(["Aaa", "Bbb", "Ccc"], makeUppercase, NaN);
		} catch (e) {
			error = e.message;
		}
		expect(results).toEqual([]);
		expect(error).toBe("Invalid parameter");
	});

	it("null", async () => {
		let error = false;
		let results = [];
		try {
			results = await asyncArrayMap(["Aaa", "Bbb", "Ccc"], makeUppercase, null);
		} catch (e) {
			error = e.message;
		}
		expect(results).toEqual([]);
		expect(error).toBe("Invalid parameter");
	});

	it("true", async () => {
		let error = false;
		let results = [];
		try {
			results = await asyncArrayMap(["Aaa", "Bbb", "Ccc"], makeUppercase, true);
		} catch (e) {
			error = e.message;
		}
		expect(results).toEqual([]);
		expect(error).toBe("Invalid parameter");
	});

	it("false", async () => {
		let error = false;
		let results = [];
		try {
			results = await asyncArrayMap(["Aaa", "Bbb", "Ccc"], makeUppercase, false);
		} catch (e) {
			error = e.message;
		}
		expect(results).toEqual([]);
		expect(error).toBe("Invalid parameter");
	});

	it('"1"', async () => {
		let error = false;
		let results = [];
		try {
			results = await asyncArrayMap(["Aaa", "Bbb", "Ccc"], makeUppercase, "1");
		} catch (e) {
			error = e.message;
		}
		expect(results).toEqual([]);
		expect(error).toBe("Invalid parameter");
	});
});

describe("Default limit", () => {
	it("Empty array", async () => {
		let error = false;
		let results = [];
		try {
			results = await asyncArrayMap([], makeUppercase);
		} catch (e) {
			error = e.message;
		}
		expect(results).toEqual([]);
		expect(error).toBe(false);
	});

	it("Async function", async () => {
		let error = false;
		let results = [];
		try {
			results = await asyncArrayMap(["Aaa", "Bbb", "Ccc"], makeUppercase);
		} catch (e) {
			error = e.message;
		}
		expect(results).toEqual(["AAA", "BBB", "CCC"]);
		expect(error).toBe(false);
	});

	it("Async lambda", async () => {
		let error = false;
		let results = [];
		try {
			results = await asyncArrayMap(["Aaa", "Bbb", "Ccc"], async word => {
				const result = await makeUppercase(word);
				return word + result;
			});
		} catch (e) {
			error = e.message;
		}
		expect(results).toEqual(["AaaAAA", "BbbBBB", "CccCCC"]);
		expect(error).toBe(false);
	});

	it("Async lambda that throws", async () => {
		let error = false;
		let results = [];
		try {
			results = await asyncArrayMap(["Aaa", "Bbb", "Ccc"], async text => {
				if (text === "Bbb") {
					throw new Error(`BAD ${text}`);
				}
				return text.toUpperCase();
			});
		} catch (e) {
			error = e.message;
		}
		expect(results).toEqual([]);
		expect(error).toEqual("BAD Bbb");
	});
});
