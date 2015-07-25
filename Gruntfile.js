module.exports = function(grunt) {

	var webpack = require("webpack");

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')

		, clean: {
			export: ['export']
		}

        , concat: {
            options: {
                banner: '/**\n * This file was auto-generated in order to merge all vendor css in one scss file.\n */\n\n'
                , process: function (src, filepath) {
                    return '/** \n * Source: ' + filepath + ' \n */ \n' + src + '\n\n';
                }
            }
            , vendorCss: {
                src: ['bower_components/nouislider/distribute/jquery.nouislider.min.css']
                , dest: 'bower_components/_vendor.scss'
            }
        }

		, copy: {
			init: {
				files: [
					{
						cwd: 'core/styleguide'
						, src: '**/*'
						, dest: 'public/styleguide'
						, expand: true
					}
				]
			}

			, js: {
				files: [
					{src: 'bower_components/fastclick/lib/fastclick.js', dest: 'public/dep/fastclick/fastclick.js'}
					, {src: 'bower_components/foundation/js/foundation.js', dest: 'public/dep/foundation/foundation.js'}
					, {src: 'bower_components/jquery/dist/jquery.js', dest: 'public/dep/jquery/jquery.js'}
					, {src: 'bower_components/modernizr/modernizr.js', dest: 'public/dep/modernizr/modernizr.js'}
                    , {src: 'bower_components/nouislider/distribute/jquery.nouislider.all.js', dest: 'public/dep/nouislider/nouislider.js'}
                    , {src: 'bower_components/select2/dist/js/select2.full.js', dest: 'public/dep/select2/select2.js'}
				]
			}

			, export: {
				files: [
					{
						cwd: 'source/_patterns'
						, src: ['**/*.*', '!00-atoms/**']
						, dest: 'export/patterns'
						, expand: true
					}
				]
			}
		}


		, gitadd: {
			export: {
				files: {
					src: ['export/']
				}
			}
		}


		, release: {
			options: {
				file: 'bower.json'
				, additionalFiles: ['package.json']
				, beforeBump: ['export']
				, npm: false
				, npmtag: false
				, github: {
					repo: 'kiva/styleguide'
					, accessTokenVar: 'GITHUB_ACCESS_TOKE'
				}
			}
		}


		, sass: {
			options: {
				includePaths: [
					'bower_components/foundation/scss'
					, 'bower_components'
					// @todo - should we also add bourbon?  require('node-bourbon').includePaths
				]
			}

			, compile: {
				options: {
					sourceMap: true
				},

				files: {
					// NOTE: source .scss file is "app.css" for consistency with Foundation convention
					// but output .css file is styles.css to meet PatternLab expectation
					'source/css/styles.css': 'source/css/scss/app.scss',
					'core/styleguide/css/styleguide.css': 'core/styleguide/css/styleguide.scss',
					'core/styleguide/css/styleguide-specific.css': 'core/styleguide/css/styleguide-specific.scss',
				}
			}

			, export: {
				files: {
					'export/styles.css': 'source/css/scss/app.scss'
				}
			}
		}


		, shell: {
			 compile: {
				command: "php core/builder.php -g"
			}
		}


        , watch: {
            html: {
                files: [
                    'source/_patterns/**/*.mustache'
                    , 'source/_patterns/**/*.json'
                    , 'source/_data/*.json'
                    , 'source/js/*.js'
                ]
                , tasks: ['shell:compile', 'copy:js']
                //, options: {
                //    spawn: false
                //    , livereload: true
                //}
            }

            , styles: {
                files: [
                    'source/css/**/*.scss'
                ]
                , tasks: ['compile']
                //, options: {
                //    spawn: false
                //    , livereload: true
                //}
            }
        }

		, webpack: {
			options: {
				context: 'source/js'
				, externals: {
					jQuery: 'jQuery'
					, jquery: 'jQuery'
				}
				, resolve: {
					root: 'bower_components'
					, alias: {
						Foundation: 'foundation/js/foundation.js'
						, fastclick: 'fastclick/lib/fastclick.js'
						, modernizr: 'modernizr/modernizr.js'
						, nouislider: 'nouislider/distribute/jquery.nouislider.all.js'
						, select2: 'select2/dist/js/select2.full.js'
					}
				}
				, entry: {
					styleguide: './app'
					, nav: './nav'
				}
				, output: {
					filename: '[name].bundle.js'
					, chunkFilename: '[id].bundle.js'
				}
				, module: {
					loaders: [
						{ test: /modernizr/, loader: 'imports?this=>window!exports?window.Modernizr' }
						, { test: /foundation/, loader: 'exports?window.Foundation'}
					]
				}
				, plugins: [
					new webpack.ProvidePlugin({
						$: 'jquery'
						, jQuery: 'jquery'
						, 'window.jQuery': 'jquery'
					})
				]
				, stats: {
					colors: true
					, modules: true
					, reasons: true
				}
				, failOnError: true
			}

			, compile: {
				output: {
					path: 'public/js'
				}
			}

			, export: {
				output: {
					path: 'export/js'
				}
				, plugins: [
					new webpack.optimize.UglifyJsPlugin()
				]
			}
		}


		// copy foundation.js into public/js
		// * install jquery and modernizr via bower
		// * do we need fitvids?
		// * replace fonts
		// * replace images
		// * delete source/css (use source/scss instead)
	});

    // vendor: concat into vendor.scss, then compile into styles.scss

	grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-git');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-release');
	grunt.loadNpmTasks('grunt-webpack');
	// @todo add livereload?

	grunt.registerTask('init', ['copy:init']);
	grunt.registerTask('compile', ['concat:vendorCss', 'sass:compile', 'shell:compile', 'copy:js', 'webpack:compile']);
	grunt.registerTask('export', ['clean:export', 'sass:export', 'webpack:export', 'copy:export', 'gitadd:export']);
	grunt.registerTask('default', 'compile');

};