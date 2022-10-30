docker exec -it healthchain_cli.blc.healthchain.com_1 \
    bash ./scripts/join-channel.sh \
    peer0 id1.national NationalMSP 13132

docker exec -it healthchain_cli.blc.healthchain.com_1 \
    bash ./scripts/join-channel.sh \
    peer0 id1.state State1MSP 12132

docker exec -it healthchain_cli.blc.healthchain.com_1 \
    bash ./scripts/join-channel.sh \
    peer0 id1.local Local1MSP 11132

docker exec -it healthchain_cli.blc.healthchain.com_1 \
    bash ./scripts/join-channel.sh \
    peer0 id2.local Local2MSP 11232

echo "Updating Anchor Peers"
docker exec -it healthchain_cli.blc.healthchain.com_1 \
    bash ./scripts/add-anchor-peer.sh \
    XCX peer0 id1.national NationalMSP 13132 1.0

docker exec -it healthchain_cli.blc.healthchain.com_1 \
    bash ./scripts/add-anchor-peer.sh \
    XCX peer0 id1.state State1MSP 12132 1.0

docker exec -it healthchain_cli.blc.healthchain.com_1 \
    bash ./scripts/add-anchor-peer.sh \
    XCX peer0 id1.local Local1MSP 11132 1.0

docker exec -it healthchain_cli.blc.healthchain.com_1 \
    bash ./scripts/add-anchor-peer.sh \
    XCX peer0 id2.local Local2MSP 11232 1.0
