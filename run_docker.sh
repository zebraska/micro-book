#!/bin/bash

# Lancement emprunt
cd emprunt
sudo docker-compose build --no-cache && sudo docker-compose up --force-recreate -d

# Lancement livre
cd ../livre
sudo docker-compose build --no-cache && sudo docker-compose up --force-recreate -d

# Lancement gateway
cd ../gateway
sudo docker-compose build --no-cache && sudo docker-compose up --force-recreate -d
