/*
 * grunt-image-jsx
 * https://github.com/b263/grunt-image-jsx
 *
 * Copyright (c) 2015 Bastian Bräu
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	// Project configuration.
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
					jsx: 'test/invert.jsx',
					debug: 'on runtime error'
				},
				files: [
					{
						src: ['test/fixtures/*.png'],
						dest: 'tmp',
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

	grunt.loadTasks('tasks');

	require('grunt-task-loader')(grunt);
	grunt.loadNpmTasks('grunt-debug-task'); // Task loader does not load this one?

	grunt.registerTask('unit-test', ['nodeunit:unit']);
	grunt.registerTask('test', ['clean', 'imagejsx', 'nodeunit']);
	grunt.registerTask('default', ['jshint', 'test']);

};
