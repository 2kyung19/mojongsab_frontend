pipeline {
    agent any

    tools {
        nodejs "NodeJS 17"
    }

    environment {
        IMAGE_NAME = 'godgaji/mojongsab_frontend'
        DOCKER_IMAGE = ''
        DOCKERHUB_CREDENTIAL = 'dockerhub'
    }

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    DOCKER_IMAGE = docker.build IMAGE_NAME
                }
            }
        }

        stage('Push Docker Image') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    docker.withRegistry('', DOCKERHUB_CREDENTIAL) {
                        DOCKER_IMAGE.push "${BUILD_NUMBER}"
                        DOCKER_IMAGE.push 'latest'
                    }
                }
            }
        }

        stage('Remove Unused Docker Image') {
            when {
                branch 'develop'
            }
            steps {
                sh 'docker rmi $IMAGE_NAME:${BUILD_NUMBER}'
                sh 'docker rmi $IMAGE_NAME:latest'
            }
        }

        stage('Deploy') {
            when {
                branch 'develop'
            }
            steps([$class: 'BapSshPromotionPublisherPlugin']) {
                sshPublisher(
                    continueOnError: false, failOnError: true,
                    publishers: [
                        sshPublisherDesc(
                            configName: 'mojongsab-fe-serever-1',
                            verbose: true,
                            transfers: [
                                sshTransfer(
                                    sourceFiles: '',
                                    removePrefix: '',
                                    remoteDirectory: '',
                                    execCommand: 'sh ~/deploy-front.sh'
                                )
                            ]
                        )
                    ]
                )
            }
        }
    }
}