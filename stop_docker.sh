#!/bin/bash

# Lancement emprunt
cd emprunt
sudo kompose down

# Lancement livre
cd ../livre
sudo kompose down

# Lancement gateway
cd ../gateway
sudo kompose down
