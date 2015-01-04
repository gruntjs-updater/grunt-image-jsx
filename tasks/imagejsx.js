/*
 * grunt-image-jsx
 * https://github.com/b263/grunt-image-jsx
 *
 * Copyright (c) 2015 Bastian Bräu
 * Licensed under the MIT license.
 */

'use strict';

var JsxRunner = require('../lib/JsxRunner'),
	isApplicationInstalled = require('../lib/utility').isApplicationInstalled;

module.exports = function (grunt) {

	grunt.registerMultiTask('imagejsx', 'Run JSX scripts on image files', function () {
		var jsxRunner = new JsxRunner(this.files),
			self = this,
			done = this.async();
		isApplicationInstalled(function yes() {
			try {
				jsxRunner.setOptions(self.options({
					debug: 'on runtime error'
				}));
				jsxRunner.processFilesSync(done);
			} catch (e) {
				grunt.fail.fatal(e);
			}
		}, function no() {
			grunt.log.error('Image processing software is not installed');
		});
	});

};