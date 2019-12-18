"use strict";

module.exports = () => ({
	debug: true,
	testFramework: "jasmine",
	files: ["src/**/*.js"],
	tests: ["test/*.spec.js"],
	env: {
		type: "node"
	}
});
