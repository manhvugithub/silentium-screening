#!/bin/bash

if [ -z "$1" ]
  then
    echo "No arguments (start || restart || stop || delete) supplied"
    exit 1;
fi

if [ "$1" = "start" ]
  then
    echo "Service start...."
    cp ./.env.development ./client/.
    # Other setting up options
    docker-compose -p game-deploy up -d
elif [ "$1" = "restart" ]
  then
    echo "Service restart...."
    docker-compose -p game-deploy restart
elif [ "$1" = "stop" ]
  then
    echo "Service stop...."
    docker-compose -p game-deploy stop
elif [ "$1" = "delete" ]
  then
    echo "Service down...."
    docker-compose -p game-deploy down
fi