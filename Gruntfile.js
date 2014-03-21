'use strict';

var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	grunt.initConfig({
		yeoman: {
			// configurable paths
			app: require('./bower.json').appPath || 'public',
			dist: 'public'
		},
		sync: {
			dist: {
				files: [{
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>',
					src: '**'
				}]
			}
		},
		watch: {
			options: {
				livereload: 35729
			},
			src: {
				files: [
					'<%= yeoman.app %>/*.html',
					'<%= yeoman.app %>/css/**/*',
					'<%= yeoman.app %>/js/**/*',
					'<%= yeoman.app %>/views/**/*'
				]
				//tasks: ['sync:dist']
			},
			coffee: {
        // tasks: ['coffee:dist'],
        files: ['/static/js/{,*/}*.coffee']
      }
      less: {
        tasks: ['less:dev', , 'autoprefixer'],
        files: ['/static/less/{,*/}*.less']
      }
		},
		connect: {
			proxies: [
				{
					context: '/myapp',
					host: 'localhost',
					port: 8080,
					https: false,
					changeOrigin: false
				}
			],
			options: {
				port: 3000,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: 'localhost',
				livereload: 35729
			},
			livereload: {
				options: {
					open: true,
					base: [
						'<%= yeoman.app %>'
					],
					middleware: function (connect) {
						return [
							proxySnippet,
							connect.static(require('path').resolve('public'))
						];
					}
				}
			},
			/*
			dist: {
				options: {
					base: '<%= yeoman.dist %>'
				}
			}
			*/
		},
		less: {
      dev: {
        files: [
          {'.tmp/static/css/aplication.css': '/static/less/aplication.less'},
          {'.tmp/static/css/bootstrap.css': '/static/less/bootstrap.less'}
        ],
        options: {
        	paths: ['/static/less']
      	}
      },
      dist: {
        options: {
          paths: ['/static/less'],
          yuicompress: true
        },
        files: [
          {'.tmp/static/css/aplication.css': '/static/less/aplication.less'},
          {'.tmp/static/css/bootstrap.css': '/static/less/bootstrap.less'}
        ]
      }
    },
    coffee: {
      options: {
        sourceMap: true,
        sourceRoot: ''
      },
      dist: {
        files: [{
          // rather than compiling multiple files here you should
          // require them into your main .coffee file
          expand: true,
          cwd: '/static/js',
          src: '{,*/}*.coffee',
          dest: '.tmp/static/js',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: '.tmp/spec',
          src: '{,*/}*.coffee',
          dest: 'test/spec'
        }]
      }
    },
		// Put files not handled in other tasks here
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>',
					src: '**'
				}]
			},
		},
		// Test settings
		karma: {
			unit: {
				configFile: 'test/config/karma.conf.js',
				singleRun: true
			}
		},
		bowercopy: {
			options: {
				destPrefix: '<%= yeoman.app %>'
			},
			test: {
				files: {
					'test/lib/angular-mocks': 'angular-mocks',
					'test/lib/angular-scenario': 'angular-scenario'
				}
			}
		}
	});

	grunt.registerTask('server', function (target) {
		grunt.task.run([
			'configureProxies',
			'connect:livereload',
			'watch'
		]);
	});

};
