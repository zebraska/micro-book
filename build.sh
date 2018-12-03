#!/bin/bash

# Build les images de chaque service
cd emprunt
bash build.sh

cd ../gateway
bash build.sh

cd ../livre
bash build.sh
