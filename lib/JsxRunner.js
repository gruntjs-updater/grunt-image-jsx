/*
 * grunt-image-jsx
 * https://github.com/b263/grunt-image-jsx
 *
 * Copyright (c) 2015 Bastian Bräu
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path'),
	fs = require('fs'),
	exec = require('child_process').exec,
	mkdirp = require('mkdirp'),
	_ = require('lodash'),
	appId = require('../lib/utility').getApplicationId();

function JsxRunner(files) {
	this.files = files;
	this.options = {};
	this.additionalArguments = [];
	this.progressHandler = new Function();
}

JsxRunner.prototype = {

	processFilesSync: function (done, i) {
		var self = this;
		i = i || 0;
		// Iterate over files
		if (i < this.files.length) {
			this.processSingleFileSync(i, function (error) {
				if (error) {
					done(error);
				} else {
					self.processFilesSync(done, i + 1);
				}
			});
		} else {
			done();
		}
	},

	processSingleFileSync: function (i, done, n) {
		var src, dest,
			self = this;
		n = n || 0;
		// Iterate over file sources
		if (n < this.files[i].src.length) {
			src = path.resolve(this.files[i].src[n]); // Full source file path
			dest = path.resolve(this.files[i].dest); // Full destination file path
			mkdirp.sync(path.dirname(dest)); // Create destination directory; otherwise the file could not be saved
			this.progressHandler(src, dest); // Inform the task about the currently processed file
			exec(this.getShellCommand(this.options.jsx, src, dest, this.options.debug, this.additionalArguments), function(error) {
				if (error) {
					done(error);
				} else {
					self.processSingleFileSync(i, done, n + 1);
				}
			});
		} else {
			done();
		}
	},

	setOptions: function (options) {
		if (options.jsx) {
			options.jsx = path.resolve(options.jsx);
			if (!fs.existsSync(options.jsx)) {
				throw new Error('Given JSX file ' + options.jsx + ' not found');
			}
		} else {
			throw new Error('No JSX file set in options.jsx');
		}
		if (!/^(before running|never|on runtime error)$/.test(options.debug)) {
			throw new Error(options.debug + ' is not a valid setting for options.debug');
		}
		this.options = options;
	},

	setAdditionalArguments: function (args) {
		this.additionalArguments = Array.prototype.slice.call(args);
	},

	getShellCommand: function (jsx, src, dest, debug, additionalArguments) {
		var cmd, args = '';
		if (additionalArguments) {
			args = _.reduce(additionalArguments, function (res, arg) {
				return res + ',"' + arg + '"';
			}, '');
		}
		cmd = 'osascript -e '
			+ '\'tell application id "' + appId + '" to do javascript file "' + jsx + '" '
			+ 'with arguments {"' + src + '","' + dest + '"' + args + '} '
			+ 'show debugger ' + debug + '\'';
		return cmd;
	}

};

module.exports = JsxRunner;
