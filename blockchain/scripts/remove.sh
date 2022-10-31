echo "Removing all Containers and Volumes of Healthchain Blockchain"
docker ps -a --format '{{.Names}}' | grep healthchain_ca | xargs docker rm -f
docker ps -a --format '{{.Names}}' | grep healthchain_peer0 | xargs docker rm -f
docker ps -a --format '{{.Names}}' | grep healthchain_orderer | xargs docker rm -f
docker ps -a --format '{{.Names}}' | grep healthchain_cli | xargs docker rm -f
docker ps -a --format '{{.Names}}' | grep healthchain_api.blc | xargs docker rm -f
docker ps -a --format '{{.Names}}' | grep dev-peer | xargs docker rm -f

docker volume ls --format '{{.Name}}' | grep healthchain.com | xargs docker volume rm -f

# remove the docker images create previously
if [[ "$1" = "-c" ]]; then
    echo "Removing Images as well...."
    # # remove docker volumes
    # docker volume ls --format '{{.Name}}' | grep healthchain.com | xargs docker volume rm -f

    # remove the chaincode images
    docker images --format '{{.Repository}}' | grep dev-peer | xargs docker image rm -f
    docker images --format '{{.Repository}}' | grep api.blc | xargs docker image rm -f
fi
