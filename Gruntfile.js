module.exports = function(grunt) {

	var webpack = require("webpack");

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')

		, postcss: {
			options: {
				map: true,
				processors: [
					require('autoprefixer')({
						browsers: ['last 3 versions']
					})
				]
			},
			dist: {
				src: ['source/css/*.css']
			},
			export: {
				src: ['export/*.css']
			}
		}

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
                src: ['node_modules/nouislider/distribute/jquery.nouislider.min.css']
                , dest: 'source/css/scss/_vendor.scss'
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
					{src: 'node_modules/jquery/dist/jquery.js', dest: 'public/dep/jquery/jquery.js'}
					, {src: 'node_modules/typeahead.js/dist/typeahead.bundle.js', dest: 'public/dep/typeahead/typeahead.js'}
				]
			}

			, export: {
				files: [
					{
						cwd: 'source/_patterns'
						, src: ['**/*.*', '!00-atoms/**']
						, dest: 'export/patterns'
						, expand: true
					},
					{
						cwd: 'source/images/flags'
						, src: ['**/*.svg']
						, dest: 'export/images/flags'
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
            , all: ['source/js/inc/**/*.js', '!**/vendor/**']
        }


		, release: {
			options: {
				file: 'package.json'
				, beforeBump: ['export']
				, npm: false
				, npmtag: false
				, tag: false
				, pushTags: false
				, github: {
					repo: 'kiva/styleguide'
					, accessTokenVar: 'GITHUB_ACCESS_TOKE'
				}
			}
		}


		, sass: {
			options: {
				includePaths: [
					'node_modules/foundation-sites/scss'
					, 'node_modules'
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
					,{
						expand: true
						, cwd: 'source/images'
						, src: ['*.svg', '!*.min.svg']
						, dest: 'source/images/'
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
					alias: {
						Foundation: 'foundation-sites/js/foundation'
						, modernizr: 'npm-modernizr'
						, nouislider: 'nouislider/distribute/jquery.nouislider.all'
						, select2: 'select2/dist/js/select2.full'
                        , slick: 'slick-carousel'
						, fitvids: __dirname + 'source/js/inc/vendor/fitvids/jquery.fitvids'
						, lazyload: 'jquery-lazyload'
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
					]
				}
				, plugins: [
					new webpack.ProvidePlugin({
						$: 'jquery'
						, jQuery: 'jquery'
						, 'window.jQuery': 'jquery'
					})
				]
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
					new webpack.optimize.UglifyJsPlugin({
						compress: {
							warnings: false
						}
					})
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
	grunt.loadNpmTasks('grunt-postcss');
	// @todo add livereload?

	grunt.registerTask('init', ['copy:init', 'githooks']);
	grunt.registerTask('compile', ['concat:vendorCss', 'sass:compile', 'postcss:dist', 'shell:compile', 'svgmin', 'svgstore:compile', 'copy:js', 'webpack:compile']);
	grunt.registerTask('export', ['clean:export', 'sass:export', 'sass:export_min', 'postcss:export', 'svgmin', 'svgstore:export', 'webpack:bundle', 'webpack:ugly_bundle', 'webpack:module', 'copy:export', 'gitadd:export']);
	grunt.registerTask('default', 'compile');
    grunt.registerTask('test', ['jshint']);

};
