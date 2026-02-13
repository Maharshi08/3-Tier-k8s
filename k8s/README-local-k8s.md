# Local Kubernetes deployment (kind / minikube)

This document explains how to build the backend and frontend images locally and deploy the app to a local Kubernetes cluster (kind or minikube).

Prereqs
- Docker installed
- Either `kind` or `minikube` and `kubectl` installed

1) Start a local cluster

- kind (recommended):

  ```bash
  kind create cluster --name three-tier-k8s --config k8s/kind-config.yaml
  kubectl cluster-info --context kind-three-tier-k8s
  ```

- minikube:

  ```bash
  minikube start
  ```

2) Build images

You can tag images as `3tire/backend:dev` and `3tire/frontend:dev`.

- If using kind (load images into kind nodes):

  ```bash
  docker build -t 3tire/backend:dev -f Application-Code/backend/Dockerfile Application-Code/backend
  docker build -t 3tire/frontend:dev -f Application-Code/frontend/Dockerfile Application-Code/frontend
  kind load docker-image 3tire/backend:dev --name local-dev
  kind load docker-image 3tire/frontend:dev --name local-dev
  ```

- If using minikube (use minikube's Docker daemon):

  ```bash
  eval $(minikube -p minikube docker-env)
  docker build -t 3tire/backend:dev -f Application-Code/backend/Dockerfile Application-Code/backend
  docker build -t 3tire/frontend:dev -f Application-Code/frontend/Dockerfile Application-Code/frontend
  # then switch back if needed
  ```

3) Deploy manifests

  ```bash
  kubectl apply -f k8s/namespace.yaml
  kubectl apply -n local-dev -f k8s/mongo/deployment.yaml
  kubectl apply -n local-dev -f k8s/backend/deployment.yaml
  kubectl apply -n local-dev -f k8s/frontend/deployment.yaml
  ``` 

4) Access the frontend

  - If using `minikube` you can run:

    ```bash
    minikube service frontend -n local-dev --url
    ```

  - If using `kind` with the `NodePort` service, open `http://localhost:30080` in your browser.
  - The frontend calls the backend at `http://localhost:30081/api/tasks` via NodePort.

5) Notes
  - The backend uses `MONGO_CONN_STR=mongodb://mongo:27017/tasksdb` (the Mongo service name `mongo` is resolvable inside the cluster).
  - The frontend container sets `BROWSER=none` to avoid trying to launch a browser in Kubernetes.
  - Data is stored in an `emptyDir` volume for `mongo` (ephemeral). For persistent data, replace with a `PersistentVolumeClaim`.
  - If the frontend can't reach the backend, check pod logs:

    ```bash
    kubectl logs -n local-dev deploy/backend
    kubectl logs -n local-dev deploy/frontend
    ```
