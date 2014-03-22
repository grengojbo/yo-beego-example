'use strict';

var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // require('load-grunt-tasks')(grunt);
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  require('time-grunt')(grunt);

  grunt.initConfig({
    yeoman: {
      // configurable paths
      // app: require('./bower.json').appPath || 'public',
      app: 'app',
      dist: 'public'
    },
    livereload: {
      port: 35728
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
    shell: {
      run: {
        command: 'bee run',
        options: {
          stdout: true,
          stderr: true
          // execOptions: {
          //   encoding: 'windows-1251',
          //   env: {
          //     Gopath: 'F:/home/jbo/src/repo-git/sssua-app'
          //   }
          // }
        }
      }
    },
    watch: {
      // options: {
      //  livereload: 35729
      // },
      // src: {
      //  files: [
      //    '<%= yeoman.app %>/*.html',
      //    '<%= yeoman.app %>/css/**/*',
      //    '<%= yeoman.app %>/js/**/*',
      //    '<%= yeoman.app %>/views/**/*',
   //        '<%= yeoman.app %>/views/*.tpl'
      //  ]
      //  //tasks: ['sync:dist']
      // },
      coffee: {
        tasks: ['coffee:dist'],
        files: ['<%= yeoman.app %>/static/js/{,*/}*.coffee']
      },
      less: {
        // tasks: ['less:dev', 'autoprefixer'],
        tasks: ['less:dev'],
        files: ['<%= yeoman.app %>/static/less/{,*/}*.less']
      },
      livereload: {
        tasks: ['livereload'],
        files: [
          '{.tmp,<%= yeoman.app %>}/views/*.{html,htm,tpl}',
          '{.tmp,<%= yeoman.app %>}/static/css/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/static/js/{,*/}*.js',
          '{.tmp,<%= yeoman.app %>}/static/img/{,*/}*.{png,jpg,jpeg,gif,webp}'
        ]
      },
    },
    connect: {
      proxies: [
        {
          context: '/',
          port: 8080,
          https: false,
          // changeOrigin: false,
          host: 'localhost'
        }
      ],
      options: {
        port: 3000,
        debug: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      livereload: {
        options: {
          // open: true,
          // base: [
            // '.tmp'
            // ''
          // ],
          middleware: function (connect) {
            // return [lrSnippet, mountFolder(connect, '.tmp'), mountFolder(connect, '.')];
            // return [lrSnippet, proxySnippet, mountFolder(connect, '.tmp'), mountFolder(connect, '.')];
            // return [proxySnippet, connect.static(require('path').resolve('.tmp'))];
            return [proxySnippet, connect.static(require('path').resolve('public'))];
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
          // {'.tmp/static/css/bootstrap.css': '/static/less/bootstrap.less'},
          {'static/css/aplication.css': '<%= yeoman.app %>/static/less/aplication.less'}
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
        // Bower components folder will be removed afterwards
        // clean: true,
        destPrefix: '<%= yeoman.app %>'
      },
      test: {
        files: {
          'test/lib/angular-mocks': 'angular-mocks',
          'test/lib/angular-scenario': 'angular-scenario'
        }
      }
    },
    open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
    },
    clean: {
      tmp: ['.tmp/*.html', '.tmp/tpl', '.tmp/<%= yeoman.mobile %>'],
      dist: ['.tmp', 'dist'],
      server: '.tmp'
    }
  });

  // grunt.renameTask('regarde', 'watch');

  grunt.registerTask('server', function (target) {
    grunt.task.run([
      'clean:server',
      'coffee:dist',
      'less:dev',
      'livereload-start',
      'configureProxies',
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

};
