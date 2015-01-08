/*
 * grunt-image-jsx
 * https://github.com/b263/grunt-image-jsx
 *
 * Copyright (c) 2015 Bastian Bräu
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	require('grunt-task-loader')(grunt, {
		mapping: {
			debug: 'grunt-debug-task'
		}
	});

	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.unit %>',
				'<%= nodeunit.functional %>'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		clean: {
			tests: ['tmp']
		},

		imagejsx: {
			test: {
				options: {
					jsx: 'test/demo.jsx',
					debug: 'on runtime error'
				},
				files: [
					{
						cwd: 'test/fixtures',
						src: ['*.png'],
						dest: 'tmp/<%= grunt.task.current.args[0] %>',
						expand: true,
						flatten: false
					}
				]
			}
		},

		nodeunit: {
			unit: ['test/JsxRunner_test.js'],
			functional: ['test/image_jsx_test.js']
		}

	});

	grunt.registerTask('unit-test', ['nodeunit:unit']);
	grunt.registerTask('test', ['clean', 'imagejsx:test:invert', 'imagejsx:test:resize:50', 'nodeunit']);
	grunt.registerTask('default', ['jshint', 'test']);

};
