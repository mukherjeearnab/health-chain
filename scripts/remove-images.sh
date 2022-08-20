# remove containers
docker rm -f local_l1-api_1
docker rm -f local_l1-mongo_1
docker rm -f local_l2-api_1

docker rm -f state_l1-api_1
docker rm -f state_l1-mongo_1
docker rm -f state_l2-api_1

# remove the l1 docker images create previously
docker image rm local_l1-api:latest
docker image rm local_l2-api:latest

docker image rm state_l1-api:latest
docker image rm state_l2-api:latest
