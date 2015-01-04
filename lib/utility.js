/*
 * grunt-image-jsx
 * https://github.com/b263/grunt-image-jsx
 *
 * Copyright (c) 2015 Bastian Bräu
 * Licensed under the MIT license.
 */

'use strict';

var exec = require('child_process').exec;

function getApplicationId() {
	return new Buffer('Y29tLmFkb2JlLlBob3Rvc2hvcA==', 'base64');
}

function isApplicationInstalled(success, error) {
	exec('osascript -e \'exists application id "' + getApplicationId() + '"\'', function (e) {
		if (e) {
			error();
		} else {
			success();
		}
	});
}

module.exports = {
	getApplicationId: getApplicationId,
	isApplicationInstalled: isApplicationInstalled
};