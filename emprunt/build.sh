#!/bin/bash

sudo docker build -t ws-emprunt-db -f Dockerfile-db .
sudo docker build -t ws-emprunt-app -f Dockerfile-app .