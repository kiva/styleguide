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
                PATH = "${PWD}/styleguide-npm-global/bin:$PATH"
            }
			// agent {
			// 	dockerfile {
            //         filename 'Dockerfile.Jenkins'
			// 	}
			// }
            steps {
                echo 'Building...'
                sh 'ls -al'
                // sh 'export PATH=${PWD}/styleguide-npm-global/bin:$PATH'
                // withEnv(['PATH+SG=${PWD}/styleguide-npm-global/bin']) {
                    sh 'echo $PATH'
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
