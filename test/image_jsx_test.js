'use strict';

var fs = require('fs'),
	isApplicationInstalled = require('../lib/utility').isApplicationInstalled;

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

module.exports.imagejsx = {
	setUp: function (done) {
		done();
	},
	testRun: function (test) {
		isApplicationInstalled(function yes() {
			test.expect(2);
			test.ok(fs.existsSync('tmp/test/fixtures/invert.png'), 'The destination file should be created');
			test.ok(fs.existsSync('tmp/test/fixtures/invert2.png'), 'The destination file should be created');
			test.done();
		}, function no() {
			test.done();
		});

	}
};