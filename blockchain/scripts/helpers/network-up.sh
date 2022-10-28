docker-compose -p "healthchain" $(find docker/docker-compose* | sed -e 's/^/-f /') up
