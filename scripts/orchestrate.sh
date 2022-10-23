docker-compose -p "ndhb-proto" $(find docker/docker-compose* | sed -e 's/^/-f /') up
