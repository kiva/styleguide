pipeline {
    agent none
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
			agent {
				dockerfile {
				  filename 'Dockerfile'
				  args '-v ${PWD}:/styleguide_export'
				}
			}
            steps {
                echo 'Building..'
            }
        }
		stage('Deploy') {
			steps {
				echo 'Deploying..'
			}
		}
    }
}