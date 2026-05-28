pipeline {

    agent {
        docker {
            image 'node:24.15.0'
        }
    }

    options {
        timestamps()
    }

    stages {

        stage('Install') {

            steps {
                sh 'npm install'
            }

            post {

                success {
                    echo 'Dependencies installed successfully!'
                }

                failure {
                    echo 'Dependency installation failed!'
                }
            }
        }

        stage('Build') {

            steps {
                sh 'npm run build'
            }

            post {

                success {
                    echo 'Build completed successfully!'
                }

                failure {
                    echo 'Build failed!'
                }
            }
        }

        stage('Tests') {

            steps {
                sh 'npm test'
            }

            post {

                success {
                    echo 'All tests passed!'
                }

                failure {
                    echo 'Tests failed!'
                }
            }
        }
    }

    post {

        success {
            echo 'Pipeline executed successfully!'
        }

        failure {
            echo 'Pipeline execution failed!'
        }

        always {
            echo 'Pipeline finished.'
        }
    }
}