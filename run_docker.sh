#!/bin/bash

# Variables d'environnement minikube
eval $(minikube docker-env)

# Lancement emprunt
cd emprunt
sudo kompose up

# Lancement livre
cd ../livre
sudo kompose up

# Lancement gateway
cd ../gateway
sudo kompose up

# Affiche les informations
kubectl get deployment,svc,pods,pvc