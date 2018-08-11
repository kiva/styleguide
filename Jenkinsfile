pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile.Jenkins'
        }
    }
    environment {
        CI = 'true'
        // PATH = "~/styleguide-npm-global/bin:$PATH"
    }
    stages {
        // What if we just skip docker for now...
        // ... Doesn't work... npm etc. are not installed
        // stage('Build') {
        //     steps {
        //         echo 'Building..'
        //         sh 'ls -al'
        //         sh 'bin/bamboo_build.sh'
        //         sh 'bin/bamboo_deploy.sh'
        //     }
        // }

        // Let's try running commands against a container
        stage('Build') {
            environment {
                // custom location for npm directory
                npm_config_cache = 'styleguide-npm-cache'
                npm_config_prefix = 'styleguide-npm-global'
                HOME = '.'
                // PATH = "${PWD}/styleguide-npm-global/bin:$PATH"
                // PATH = "${PWD}/styleguide-npm-global/bin:$PATH"
            }
			// agent {
			// 	dockerfile {
            //         filename 'Dockerfile.Jenkins'
			// 	}
			// }
            steps {
                echo 'Building...'
                sh 'ls -al'
                // sh 'npm install -g grunt-cli'
                // sh 'npm ls -g grunt-cli'
                // sh 'npm install'
                // sh 'npm ls grunt'
                // sh 'ls ${PWD}/styleguide-npm-global/bin'
                // sh '${PWD}/styleguide-npm-global/bin/grunt init'
                // sh '${PWD}/styleguide-npm-global/bin/grunt compile'
                // sh 'export PATH=${PWD}/styleguide-npm-global/bin:$PATH'
                // withEnv(['grunt=${PWD}/styleguide-npm-global/bin/grunt']) {
                    sh 'bin/bamboo_build.sh'
                // }
            }
        }

        // stage('Build') {
		// 	agent {
		// 		dockerfile {
        //         // Volumes aren't available when building and image
        //         // https://docs.docker.com/engine/reference/commandline/build/
		// 		// additionalBuildArgs '--build-arg -v ${PWD}:/styleguide_export'
		// 		}
		// 	}
        //     steps {
        //         echo 'Building..'
        //     }
        // }

		stage('Deploy') {
			steps {
				echo 'Deploying..'
			}
		}
    }
}
