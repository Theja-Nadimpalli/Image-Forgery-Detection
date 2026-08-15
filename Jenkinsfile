pipeline {
    agent any

    environment{
        DOCKER_CREDS = credentials('docker-pat')
    }

    stages{

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
               echo "pushing completed"

            }
        }
        stage("kubernates part"){
            steps{
               bat "call kubectl apply -f K8_yaml_files/frontend-deployment.yaml"
               bat "call kubectl apply -f K8_yaml_files/frontend-service.yaml"
               echo "applied"
               bat "call kubectl port-forward service/frontend 8000:8000"
               echo "success-successful"
            }
        }
    }
}