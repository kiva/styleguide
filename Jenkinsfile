pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile.Jenkins'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        // Let's try running commands against a container
        stage('Build') {
            environment {
                // custom location for npm directory
                npm_config_cache = 'styleguide-npm-cache'
                npm_config_prefix = 'styleguide-npm-global'
                HOME = '.'
            }
            steps {
                echo 'Building...'
                sh 'ls -al'
                sh 'bin/bamboo_build.sh'
                sh 'ls public'
            }
        }

        stage('Archive') {
            steps {
                archiveArtifacts artifacts: 'public/**', fingerprint: true
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
