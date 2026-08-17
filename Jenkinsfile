pipeline {
    agent any

    environment{
        DOCKER_CREDS = credentials('docker-pat')
    }

    stages{
        stage("Build Backend Image") {
            steps {
                bat "call docker build -t backend ./Backend"
                echo "Backend image built successfully"
            }
        }

        stage("Tag Backend Image") {
            steps {
                bat "call docker tag backend %DOCKER_CREDS_USR%/backend:init"
                echo "Backend image tagged"
            }
        }

        stage("Build Docker image"){
            steps{
                bat "call docker build -t frontend-2 ./Frontend"
                echo "building image successful"
            }
        }
        stage("tagging image"){
            steps{
                bat "call docker tag frontend-2 %DOCKER_CREDS_USR%/frontend-2:init"
                echo " tagging complete"
            }
        }

        stage("docker push"){
            steps{
               bat 'docker login -u %DOCKER_CREDS_USR% -p %DOCKER_CREDS_PSW%'
               bat 'docker push %DOCKER_CREDS_USR%/frontend-2:init'
               bat 'docker push %DOCKER_CREDS_USR%/backend:init'
               echo "pushing completed"

            }
        }
        stage("kubernates part"){
            steps{
               bat 'kubectl --kubeconfig="C:\\Users\\theja\\.kube\\config" apply -f K8_yaml_files/backend-deployment.yaml'
               bat 'kubectl --kubeconfig="C:\\Users\\theja\\.kube\\config" apply -f K8_yaml_files/backend-service.yaml'

               bat 'kubectl --kubeconfig="C:\\Users\\theja\\.kube\\config" apply -f K8_yaml_files/frontend-deployment.yaml'
               bat 'kubectl --kubeconfig="C:\\Users\\theja\\.kube\\config" apply -f K8_yaml_files/frontend-service.yaml'

               echo "applied"
               echo "success-successful"
               echo "triggered action done"
            }
        }
    }

    post {
        success {
            echo "CI/CD pipeline completed successfully"
        }

        failure {
            echo "Pipeline failed"
        }

        always {
            echo "Pipeline execution completed"
        }
    }
}