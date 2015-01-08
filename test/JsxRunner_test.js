'use strict';

var JsxRunner = require('../lib/JsxRunner'),
	path = require('path'),
	_ = require('lodash'),
	appId = require('../lib/utility').getApplicationId();

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

var validOptions = {
	debug: 'never',
	jsx: 'test/demo.jsx'
};

module.exports.jsxRunner = {

	setUp: function (done) {
		this.jsxRunner = new JsxRunner();
		done();
	},

	missingJsxFileThrowsError: function (test) {
		var self = this;
		test.expect(1);
		test.throws(function () {
			self.jsxRunner.setOptions({});
		});
		test.done();
	},

	nonexistantJsxFileThrowsError: function (test) {
		var self = this,
			invalidOptions = _.cloneDeep(validOptions);
		invalidOptions.jsx = 'missing.jsx';
		test.expect(1);
		test.throws(function () {
			self.jsxRunner.setOptions(invalidOptions);
		});
		test.done();
	},

	jsxFileIsExpandedToFullPath: function (test) {
		var fullPath = path.resolve(validOptions.jsx);
		test.expect(1);
		this.jsxRunner.setOptions(validOptions);
		test.equal(this.jsxRunner.options.jsx, fullPath);
		test.done();
	},

	invalidDebugOptionThrowsError: function (test) {
		var self = this,
			invalidOptions = _.cloneDeep(validOptions);
		test.expect(1);
		invalidOptions.debug = 'invalid setting';
		test.throws(function () {
			self.jsxRunner.setOptions(invalidOptions);
		});
		test.done();
	},

	validDebugOptionsAreAccepted: function (test) {
		var validDebugSettings = ['before running', 'never', 'on runtime error'],
			options = _.cloneDeep(validOptions),
			self = this;
		test.expect(validDebugSettings.length);
		validDebugSettings.forEach(function (validSetting) {
			options = _.cloneDeep(validOptions);
			options.debug = validSetting;
			self.jsxRunner.setOptions(options);
			test.equal(self.jsxRunner.options.debug, validSetting);
		});
		test.done();
	},

	shellCommandIsBuiltCorrectly: function (test) {
		test.expect(1);
		test.equal(this.jsxRunner.getShellCommand('jsx', 'src', 'dest', 'debug'),
			'osascript -e \'tell application id "' + appId + '" to do javascript file "jsx" with arguments {"src","dest"} show debugger debug\''
		);
		test.done();
	},

	shellCommandConsidersAdditionalArguments: function (test) {
		test.expect(1);
		test.equal(this.jsxRunner.getShellCommand('jsx', 'src', 'dest', 'debug', [1, 2]),
			'osascript -e \'tell application id "' + appId + '" to do javascript file "jsx" with arguments {"src","dest","1","2"} show debugger debug\''
		);
		test.done();
	}

};
