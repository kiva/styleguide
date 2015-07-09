module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')

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
		}


		, shell: {
			//init: {
			//	command: "php core/builder.php -g"
			//}
			//
			//,
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


		// copy foundation.js into public/js
		// * install jquery and modernizr via bower
		// * do we need fitvids?
		// * replace fonts
		// * replace images
		// * delete source/css (use source/scss instead)
	});

    // vendor: concat into vendor.scss, then compile into styles.scss

    grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-shell');
	// @todo add livereload?

	grunt.registerTask('init', ['copy:init']);
	grunt.registerTask('compile', ['concat:vendorCss', 'sass', 'shell:compile', 'copy:js']);
};