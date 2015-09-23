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
					{src: 'bower_components/jquery/dist/jquery.js', dest: 'public/dep/jquery/jquery.js'}
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
				options: {
					all: true
				}
				,files: {
					src: ['export/']
				}
			}
		}


        , githooks: {
            all: {
                'pre-push': 'test'
            }
        }


        , jshint: {
            options: {
                jshintrc: '.jshintrc'
            }
            , all: ['source/js']
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
					'core/styleguide/css/styleguide-specific.css': 'core/styleguide/css/styleguide-specific.scss'
				}
			}

			, export: {
				files: {
					'export/styles.css': 'source/css/scss/app.scss'
				}
			}

			, export_min: {
				options: {
					outputStyle: 'compressed'
				}
				, files: {
					'export/styles.min.css': 'source/css/scss/app.scss'
				}
			}
		}


		, shell: {
			 compile: {
				command: "php core/builder.php -g"
			}
		}


		, svgmin: {
			options: {
				plugins: []
				, floatPrecision: 2
			}
			, minify: {
				files: [
					{
						expand: true
						, cwd: 'source/images/icons'
						, src: ['*.svg']
						, dest: 'source/images/icons.min'
					}
					,{
						expand: true
						, cwd: 'source/images/about'
						, src: ['*.svg', '!*.min.svg']
						, dest: 'source/images/about/'
						, rename: function(dest, src) {
							return dest + src.replace('.svg', '.min.svg');
						}
					}
				]
			}
		}


		, svgstore: {
			options: {
				prefix: 'icon-'
				, svg: {
					'xmlns': 'http://www.w3.org/2000/svg'
					, 'xmlns:xlink': 'http://www.w3.org/1999/xlink'
					, 'xmlns:sketch': 'http://www.bohemiancoding.com/sketch/ns'
					, 'style': 'display:none;'
				}
				,preserveDescElement: false
			}

			, compile: {
				files: {
					'public/images/icons.svg': ['source/images/icons.min/*.svg']
				}
			}

			, export: {
				files: {
					'export/images/icons.svg': ['source/images/icons.min/*.svg']
				}
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
					jquery: {
						var: 'jQuery'
						, amd: 'jquery'
					}
				}
				, resolve: {
					root: 'bower_components'
					, alias: {
                        bloodhound: 'typeahead.js/dist/bloodhound.js'
                        , fastclick: 'fastclick/lib/fastclick.js'
						, Foundation: 'foundation/js/foundation.js'
						, modernizr: 'modernizr/modernizr.js'
						, nouislider: 'nouislider/distribute/jquery.nouislider.all.js'
						, select2: 'select2/dist/js/select2.full.js'
                        , slick: 'slick.js/slick/slick.js'
						, typeahead: 'typeahead.js/dist/typeahead.jquery.js'
						, fitvids: 'fitvids/jquery.fitvids.js'
					}
				}
				, entry: {
					styleguide: './inc/app'
				}
				, output: {
					filename: '[name].bundle.js'
					, chunkFilename: '[id].bundle.js'
				}
				, module: {
					loaders: [
						{ test: /modernizr/, loader: 'imports?this=>window!exports?window.Modernizr' }
						, { test: /foundation/, loader: 'exports?window.Foundation'}
						, { test: /bloodhound/, loader: 'imports?this=>window!exports?window.Bloodhound'}
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
				entry: {
					nav: './inc/nav'
				}
				, output: {
					path: 'public/js'
				}
			}

			, bundle: {
				entry: {
					nav: './inc/nav'
				}
				, output: {
					path: 'export/js'
				}
			}

			, ugly_bundle: {
				entry: {
					nav: './inc/nav'
				}
				, output: {
					path: 'export/js'
					, filename: '[name].bundle.min.js'
					, chunkFilename: '[id].bundle.min.js'
				}
				, plugins: [
					new webpack.optimize.UglifyJsPlugin()
				]
			}

			, module: {
				entry: {
					nav: './inc/nav'
				}
				, output: {
					path: 'export/js'
					, filename: '[name].js'
					, chunkFilename: '[id].js'
					, library: 'Styleguide'
					, libraryTarget: 'amd'
				}
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
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-git');
    grunt.loadNpmTasks('grunt-githooks');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-svgstore');
	grunt.loadNpmTasks('grunt-release');
	grunt.loadNpmTasks('grunt-webpack');
	// @todo add livereload?

	grunt.registerTask('init', ['copy:init', 'githooks']);
	grunt.registerTask('compile', ['concat:vendorCss', 'sass:compile', 'shell:compile', 'svgmin', 'svgstore:compile', 'copy:js', 'webpack:compile']);
	grunt.registerTask('export', ['clean:export', 'sass:export', 'sass:export_min', 'svgmin', 'svgstore:export', 'webpack:bundle', 'webpack:ugly_bundle', 'webpack:module', 'copy:export', 'gitadd:export']);
	grunt.registerTask('default', 'compile');
    grunt.registerTask('test', ['jshint']);

};