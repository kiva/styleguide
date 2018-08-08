pipeline {
    agent {
        dockerfile true
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh './bin/bamboo_build.sh'
            }
        }
		stage('Deploy') {
			steps {
				echo 'Deploying..'
			}
		}
    }
}