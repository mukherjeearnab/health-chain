echo "Removing all Containers of Healthchain Blockchain"
docker rm -f healthchain_cli.blc.healthchain.com_1
docker rm -f healthchain_orderer.blc.healthchain.com_1
docker rm -f healthchain_ca.id1.national.healthchain.com_1
docker rm -f healthchain_peer0.id2.local.healthchain.com_1
docker rm -f healthchain_peer0.id1.national.healthchain.com_1
docker rm -f healthchain_ca.id1.local.healthchain.com_1
docker rm -f healthchain_peer0.id1.local.healthchain.com_1
docker rm -f healthchain_ca.id1.state.healthchain.com_1
docker rm -f healthchain_peer0.id1.state.healthchain.com_1
docker rm -f healthchain_ca.id2.local.healthchain.com_1

# remove docker volumes
docker volume ls --format '{{.Name}}' | grep healthchain.com | xargs docker volume rm -f

# remove the chaincode containers and images
docker ps -a --format '{{.Names}}' | grep dev-peer | xargs docker rm -f
docker images --format '{{.Repository}}' | grep dev-peer | xargs docker image rm -f
