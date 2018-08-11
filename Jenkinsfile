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
                // Add this in if you want to be able to confirm before deploying
                // input message: 'Deploy? (Click "Proceed" to continue)'
                // This currently fails with an error... check the previous log for the rsync error then maybe ask Jay to help
                // sh 'bin/bamboo_deploy.sh'
			}
		}
    }
}
