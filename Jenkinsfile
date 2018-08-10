pipeline {
    agent any
    environment {
        CI = 'true'
    }
    stages {
        // What if we just skip docker for now...
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'ls -al'
                sh 'bin/bamboo_build.sh'
                sh 'bin/bamboo_deploy.sh'
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
