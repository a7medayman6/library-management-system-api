#!/bin/bash

if [[ -z "$1" ]]; then
    echo "Usage: $0 <service>"
    echo "List of services:"
    echo "  - db"
    echo "  - backend"
    echo "  - seed"
    echo ""
    echo "Example: $0 db"
    exit 1
fi

docker compose logs --no-log-prefix -f $1