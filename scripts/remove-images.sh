# remove containers
docker rm -f healthchain_api.l2.id1.national.healthchain.com_1
docker rm -f healthchain_api.l2.id1.state.healthchain.com_1
docker rm -f healthchain_api.l1.id1.state.healthchain.com_1
docker rm -f healthchain_api.l1.id1.national.healthchain.com_1
docker rm -f healthchain_api.l2.id2.local.healthchain.com_1
docker rm -f healthchain_api.l2.id1.local.healthchain.com_1
docker rm -f healthchain_api.l1.id2.local.healthchain.com_1
docker rm -f healthchain_api.l1.id1.local.healthchain.com_1
docker rm -f healthchain_api.registry.healthchain.com_1
docker rm -f healthchain_db.registry.healthchain.com_1

# remove the docker images create previously
# docker image rm -f healthchain_api.l2.id1.national.healthchain.com:latest
# docker image rm -f healthchain_api.l2.id1.state.healthchain.com:latest
# docker image rm -f healthchain_api.l1.id1.state.healthchain.com:latest
# docker image rm -f healthchain_api.l1.id1.national.healthchain.com:latest
# docker image rm -f healthchain_api.l2.id2.local.healthchain.com:latest
# docker image rm -f healthchain_api.l2.id1.local.healthchain.com:latest
# docker image rm -f healthchain_api.l1.id2.local.healthchain.com:latest
# docker image rm -f healthchain_api.l1.id1.local.healthchain.com:latest
# docker image rm -f healthchain_api.registry.healthchain.com:latest
