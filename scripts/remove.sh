if [[ "$1" == "-s" || "$1" == "-a" ]]; then
    # remove containers
    docker ps -a --format '{{.Names}}' | grep healthchain_api.l | xargs docker rm -f
    docker ps -a --format '{{.Names}}' | grep healthchain_db | xargs docker rm -f
    docker ps -a --format '{{.Names}}' | grep healthchain_api.reg | xargs docker rm -f
fi

if [[ "$1" == "-b" || "$1" == "-a" ]]; then
    echo "Removing Blockchain Components...."
    cd blockchain
    bash ./scripts/remove.sh $2
fi

# remove the docker images create previously
if [[ "$2" = "-c" ]]; then
    echo "Removing Images, Volumes and Networks as well...."
    docker image ls --format '{{.Repository}}' | grep healthchain.com | xargs docker image rm -f
    docker image rm -f healthchain_api.registry.healthchain.com:latest

    # remove docker network
    docker network remove healthchain_healthnet
fi
