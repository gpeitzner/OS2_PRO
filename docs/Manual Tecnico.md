# MANUAL TECNICO

Para desarrollar EZGAMES utilizamos 3 servicios, api, db y web los cuales se describen a continuacion. Cada uno de los cuales se controla mediante un dockerfile y un archivo para el despliegue llamado deployment.yaml


## SETUP

Para levantar los servicios mencionados es necesario ejecutar el archivo gke.sh que se encuentra en la raiz de este proyecto o bien ejecutar los siguientes comandos en el orden mencionado.

        #database
        gcloud compute disks create --size=10GB --zone=us-central1-f mongodb-disk
        kubectl create namespace database
        kubectl apply -f deployment.yaml
        kubectl apply -f service.yaml
        #api
        docker build -t gcr.io/$DEVSHELL_PROJECT_ID/api:1.0 .
        gcloud auth configure-docker
        docker push gcr.io/$DEVSHELL_PROJECT_ID/api:1.0
        kubectl create namespace api
        kubectl apply -f deployment.yaml
        kubectl apply -f service.yaml
        #web
        docker build -t gcr.io/$DEVSHELL_PROJECT_ID/web:1.0 .
        gcloud auth configure-docker
        docker push gcr.io/$DEVSHELL_PROJECT_ID/web:1.0
        kubectl create namespace web
        kubectl apply -f deployment.yaml
        kubectl apply -f service.yaml
        
## API

Un api basada en la ultima version de NODE js, utiliza 3 replicas en kubernetes en el espacio api configurado utilizando el archivo deployment.yaml con las configuraciones adicionales del servicio utilizando el archivo service.yaml

### DOCKERFILE
    FROM node:latest
    WORKDIR /code
    COPY . .
    RUN npm install
    EXPOSE 8080
    CMD ["npm", "run", "start"]
    
### DEPLOYMENT.YAML

    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: api
      namespace: api
    spec:
      replicas: 3
      selector:
        matchLabels:
          app: api
      template:
        metadata:
          labels:
            app: api
        spec:
          containers:
            - name: api-container
              image: gcr.io/peppy-aileron-292121/api:1.0
              ports:
                - containerPort: 8080

### SERVICE.YAML

    apiVersion: v1
    kind: Service
    metadata:
      name: api-service
      namespace: api
    spec:
      selector:
        app: api
      ports:
        - port: 8080
          targetPort: 8080
      type: LoadBalancer


## DB
Se utilizo una base datos mongo en su ultima version, ademas se configuro un volumen para lograr la persistencia de datos en mongodb todo configurado dentro del espacio "database" configurado en el archivo deploymeny.yaml con las configuraciones del servicio dentro del archivo service.yaml

### DEPLOYMENT.YAML

      apiVersion: apps/v1
      kind: Deployment
      metadata:
        name: database
        namespace: database
      spec:
        selector:
          matchLabels:
            app: database
        replicas: 1
        template:
          metadata:
            labels:
              app: database
          spec:
            containers:
              - name: mongodb
                image: mongo:latest
                ports:
                  - containerPort: 27017
                volumeMounts:
                  - name: mongodb-persistent-storage
                    mountPath: /data/db
            volumes:
              - name: mongodb-persistent-storage
                gcePersistentDisk:
                  pdName: mongodb-disk
                  fsType: ext4
                  
### SERVICE.YAML

    apiVersion: v1
    kind: Service
    metadata:
      name: database-service
      namespace: database
    spec:
      selector:
        app: database
      ports:
        - port: 27017
          targetPort: 27017
      type: LoadBalancer

## WEB
Utilizamos un servidor web NGINX para mantener el servicio de nuestra aplicacion web, nuestra solucion web se basa en angular CLI en la version 11.0.5 y fue desplegada dentro del espacio "web" en kubernetes y configurado en el puerto 80 utilizando el archivo service.yaml

### DOCKERFILE

    FROM nginx
    COPY ./dist/web /usr/share/nginx/html

### DEPLOYMENT.YAML

    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: web
      namespace: web
    spec:
      replicas: 3
      selector:
        matchLabels:
          app: web
      template:
        metadata:
          labels:
            app: web
        spec:
          containers:
            - name: web-container
              image: gcr.io/peppy-aileron-292121/web:1.0
              ports:
                - containerPort: 80
                
### SERVICE.YAML

    apiVersion: v1
    kind: Service
    metadata:
      name: web-service
      namespace: web
    spec:
      selector:
        app: web
      ports:
        - port: 80
          targetPort: 80
      type: LoadBalancer
