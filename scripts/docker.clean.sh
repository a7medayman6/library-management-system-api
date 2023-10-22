#!/bin/bash

echo "Stopping and removing containers..."
echo +docker compose down --remove-orphans

docker compose down --remove-orphans

echo "Done!"
