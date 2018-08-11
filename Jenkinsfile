pipeline {
    agent any
    environment {
        CI = 'true'
        npm_config_cache = 'npm-cache'
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
			agent {
				dockerfile {
                    filename 'Dockerfile.Jenkins'
				}
			}
            steps {
                echo 'Building...'
                sh 'ls -al'
                sh 'bin/bamboo_build.sh'
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
