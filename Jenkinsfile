pipeline {
    agent any

    tools {
        nodejs "NodeJS 17"
    }

    environment {
        IMAGE_NAME = 'godgaji/mojongsab_frontend'
        DOCKER_IMAGE = ''
        DOCKERHUB_CREDENTIAL = 'dockerhub'

        SLACK_CHANNEL = '#배포'
        SLACK_TEAM_DOMAIN = 'mojongsab'
        SLACK_TOKEN_CREDENTIAL = 'slack_mojongsab'
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
                                    execCommand: 'sh ~/deploy.sh'
                                )
                            ]
                        )
                    ]
                )
            }
        }
    }

    post {
        success {
            slackSend (
                channel: SLACK_CHANNEL,
                color: '#00FF00',
                message: "mojongsab frontend(${env.BRANCH_NAME}) - #${env.BUILD_NUMBER} Success after ${currentBuild.durationString.replace(' and counting', '')} (<${env.BUILD_URL}|Open>)",
                teamDomain: SLACK_TEAM_DOMAIN,
                tokenCredentialId: SLACK_TOKEN_CREDENTIAL
            )
        }
        failure {
            slackSend (
                channel: SLACK_CHANNEL,
                color: '#F01717',
                message: "mojongsab frontend(${env.BRANCH_NAME}) - #${env.BUILD_NUMBER} Failure after ${currentBuild.durationString.replace(' and counting', '')} (<${env.BUILD_URL}|Open>)",
                teamDomain: SLACK_TEAM_DOMAIN,
                tokenCredentialId: SLACK_TOKEN_CREDENTIAL
            )
        }
    }

}