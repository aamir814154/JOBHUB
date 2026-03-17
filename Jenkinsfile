pipeline {
    agent any

    environment {
        DOCKER_IMAGE   = "88653/linkdin"
        DOCKER_VERSION = "v1"
    }

    stages {

        stage('Clone Code'){
            steps{
                git branch: 'main', url: 'https://github.com/aamir814154/JOBHUB.git'
            }
        }

        stage('Docker Build Image'){
            steps{
                sh "docker build -t $DOCKER_IMAGE:$DOCKER_VERSION ."
            }
        }

        stage("PUSH DOCKER IMAGE"){
            steps{
                withCredentials ([usernamePassword(
                    credentialsId:'dockerhub-creds',
                    usernameVariable: "USER",
                    passwordVariable: 'PASS'
                )]) {
                    sh "echo $PASS | docker login -u $USER --password-stdin"
                    sh 'docker push ${DOCKER_IMAGE}:${DOCKER_VERSION}'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG_FILE')]) {
                    sh '''
                    export KUBECONFIG=$KUBECONFIG_FILE
                    kubectl get nodes
                    kubectl apply -f k8s/deployment.yml
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "Deployment is successful"
        }
        failure {
            echo "Deployment got failed"
        }
    }

    

}

