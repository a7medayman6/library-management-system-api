#!/bin/bash

echo "Provisioning the application ..."

echo "Checking/Pulling the latest images ..."

DB_IMAGE="mysql"
BACKEND_IMAGE="a7medayman6/library-management-system"

echo +docker images | grep -q "$DB_IMAGE" 
docker images | grep -q "$DB_IMAGE" 

if [[ "$?" -ne 0 ]]; then
    echo ""
    
    echo +docker pull mysql:8.0
    docker pull mysql:8.0
    
    if [[ "$?" -ne 0 ]]; then
        echo "Failed to pull the latest "$DB_IMAGE"  image!"
        echo "Exiting ..."
        exit 1
    fi
fi


docker images | grep -q "$BACKEND_IMAGE"
if [[ "$?" -ne 0 ]]; then
    echo ""
    
    echo +docker pull a7medayman6/library-management-system
    docker pull a7medayman6/library-management-system
    if [[ "$?" -ne 0 ]]; then
        echo "Failed to pull the latest "$BACKEND_IMAGE" image!"
        echo "Exiting ..."
        exit 1
    fi
fi



echo ""
echo "Successfully pulled the latest images!"

echo "Starting the Database service ..."
echo +docker compose up -d db
docker compose up -d db

echo "Waiting for the Database service to be ready ..."
echo +sleep 50
sleep 50

echo "Starting the Backend service ..."
echo +docker compose up -d backend
docker compose up -d backend

echo "Waiting for the Backend service to be ready ..."
echo +sleep 50
sleep 50

echo "Starting the Seed service ..."
echo +docker compose up seed
docker compose up seed

echo "Provisioning completed!"


echo ""

echo "You can now access the API Swagger Documentation at http://localhost:3000/api/v1/docs/"

echo "Run ./scripts/docker.logs.sh db to see the database logs"
echo "Run ./scripts/docker.logs.sh backend to see the backend logs"
echo "Run ./scripts/docker.logs.sh seed to see the seed logs"

echo "The Basic Auth credentials are:"
echo "Username: admin"
echo "Password: admin"

echo ""
echo "The application is ready to use!"

