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
        stage('Build') {
            environment {
                // custom location for npm directory
                npm_config_cache = 'styleguide-npm-cache'
                // custom location for npm global directory
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

		stage('Deploy') {
			steps {
				echo 'Deploying..'
                input message: 'Deploy? (Click "Proceed" to continue)'
                sh 'bin/bamboo_deploy.sh'
			}
		}
    }
}
