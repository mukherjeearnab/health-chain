CHAINCODE=$1
PEER=$2
ORG=$3
MSP=$4
PORT=$5
VERSION=$6

CORE_PEER_LOCALMSPID=$MSP

PEER_PATH_COMMOM=/opt/gopath/src/github.com/hyperledger/fabric/peer/organizations/peerOrganizations/

CORE_PEER_TLS_ROOTCERT_FILE_N=${PEER_PATH_COMMOM}id1.national.healthchain.com/peers/$PEER.id1.national.healthchain.com/tls/ca.crt
CORE_PEER_TLS_ROOTCERT_FILE_S1=${PEER_PATH_COMMOM}id1.state.healthchain.com/peers/$PEER.id1.state.healthchain.com/tls/ca.crt
CORE_PEER_TLS_ROOTCERT_FILE_L1=${PEER_PATH_COMMOM}id1.local.healthchain.com/peers/$PEER.id1.local.healthchain.com/tls/ca.crt
CORE_PEER_TLS_ROOTCERT_FILE_L2=${PEER_PATH_COMMOM}id2.local.healthchain.com/peers/$PEER.id2.local.healthchain.com/tls/ca.crt

# CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/organizations/peerOrganizations/$ORG.healthchain.com/users/Admin@$ORG.healthchain.com/msp
# CORE_PEER_ADDRESS=$PEER.$ORG.healthchain.com:$PORT

CORE_PEER_TLS_ENABLED=true
ORDERER_SYSCHAN_ID=system-channel

ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/organizations/ordererOrganizations/blc.healthchain.com/orderers/orderer.blc.healthchain.com/msp/tlscacerts/tlsca.blc.healthchain.com-cert.pem
ORDERER=orderer.blc.healthchain.com:7050
CHANNEL_NAME="mainchannel"

echo "Commit the Chaincode"
peer lifecycle chaincode commit -o $ORDERER \
    --tls --cafile $ORDERER_CA \
    --channelID $CHANNEL_NAME \
    --name $CHAINCODE --version $VERSION --sequence 1 --init-required \
    --peerAddresses peer0.id1.national.healthchain.com:13132 --tlsRootCertFiles $CORE_PEER_TLS_ROOTCERT_FILE_N \
    --peerAddresses peer0.id1.state.healthchain.com:12132 --tlsRootCertFiles $CORE_PEER_TLS_ROOTCERT_FILE_S1 \
    --peerAddresses peer0.id1.local.healthchain.com:11132 --tlsRootCertFiles $CORE_PEER_TLS_ROOTCERT_FILE_L1 \
    --peerAddresses peer0.id2.local.healthchain.com:11232 --tlsRootCertFiles $CORE_PEER_TLS_ROOTCERT_FILE_L2 >&log.txt

cat log.txt

echo "Query Committed Chaincode"
sleep 10
peer lifecycle chaincode querycommitted \
    --channelID $CHANNEL_NAME --name $CHAINCODE >&log.txt

cat log.txt

echo "Init the Chaincode"
# peer chaincode instantiate \
#     -o $ORDERER --tls \
#     --cafile $ORDERER_CA \
#     -v $VERSION -c '{"Args":[]}' \
#     -C $CHANNEL_NAME -n $CHAINCODE >&log.txt

peer chaincode invoke \
    -o $ORDERER --tls \
    --cafile $ORDERER_CA -C $CHANNEL_NAME \
    -n $CHAINCODE \
    --peerAddresses peer0.id1.national.healthchain.com:13132 --tlsRootCertFiles $CORE_PEER_TLS_ROOTCERT_FILE_N \
    --peerAddresses peer0.id1.state.healthchain.com:12132 --tlsRootCertFiles $CORE_PEER_TLS_ROOTCERT_FILE_S1 \
    --peerAddresses peer0.id1.local.healthchain.com:11132 --tlsRootCertFiles $CORE_PEER_TLS_ROOTCERT_FILE_L1 \
    --peerAddresses peer0.id2.local.healthchain.com:11232 --tlsRootCertFiles $CORE_PEER_TLS_ROOTCERT_FILE_L2 \
    --isInit -c '{"Args":[]}' >&log.txt

# peer chaincode invoke \
#     -o $ORDERER --tls \
#     --cafile $ORDERER_CA -C $CHANNEL_NAME \
#     -n $CHAINCODE --isInit -c '{"Args":["init", "a", "100", "b", "200"]}'

cat log.txt
