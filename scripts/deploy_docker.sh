#!/bin/bash

cd ..
docker stop $(docker ps -q --filter ancestor=home-dashboard)
docker build -t home-dashboard .
docker run -d --network="host" --restart unless-stopped home-dashboard
