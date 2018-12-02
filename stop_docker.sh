#!/bin/bash

# Lancement emprunt
cd emprunt
sudo docker-compose down

# Lancement WS2
cd ../ws2
sudo docker-compose down

# Lancement livre
cd ../livre
sudo docker-compose down

# Lancement gateway
cd ../gateway
sudo docker-compose down
