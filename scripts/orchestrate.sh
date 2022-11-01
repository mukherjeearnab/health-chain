./generated/bin/docker-compose -p "healthchain" $(find docker blockchain/docker -maxdepth 1 -name "docker-compose*.yml" | sed -e 's/^/-f /') up -d
