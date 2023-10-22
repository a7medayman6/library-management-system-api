#!/bin/bash

echo "Running Automated Tests using Docker ..."

echo +docker compose up test
docker compose up test

echo "Done!"




