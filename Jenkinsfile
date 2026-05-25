pipeline {

    agent {
        docker {
            image 'node:24.15.0'
        }
    }

    options {
        timestamps()
    }

    triggers {
        cron('0,5,10,15,20,25,30,35,40,45,50,55 * * * *')
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Coverage') {
            steps {
                sh 'npm run coverage'
            }
        }
    }
}