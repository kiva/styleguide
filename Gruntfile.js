module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')

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
				]
			}
		}


		, sass: {
			options: {
				includePaths: [
					'bower_components/foundation/scss'
					// @todo - should we also add bourbon?  require('node-bourbon').includePaths
				]
					}
			, compile: {
				options: {
					sourceMap: false
				},

				files: {
					'source/css/styles.css': 'source/css/scss/styles.scss'
				}
			}
		}


		, shell: {
			init: {
				command: "php core/builder.php -g"
			}

			, compile: {
				command: "php core/builder.php -gp"
			}
		}


		// copy foundation.js into public/js
		// * install jquery and modernizr via bower
		// * do we need fitvids?
		// * replace fonts
		// * replace images
		// * delete source/css (use source/scss instead)
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-shell');
	// @todo add livereload?

	grunt.registerTask('init', ['copy:init', 'shell:init']);
	grunt.registerTask('compile', ['sass', 'shell:compile', 'copy:js']);
};