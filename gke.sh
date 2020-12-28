docker build -t gcr.io/$DEVSHELL_PROJECT_ID/api:1.0 .
gcloud auth configure-docker
docker push gcr.io/$DEVSHELL_PROJECT_ID/api:1.0

kubectl create namespace api
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml