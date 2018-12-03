#!/bin/bash

sudo docker build -t ws-livre-db -f Dockerfile-db .
sudo docker build -t ws-livre-app -f Dockerfile-app .