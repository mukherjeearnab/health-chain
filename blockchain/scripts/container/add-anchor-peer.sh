CHAINCODE=$1
PEER=$2
ORG=$3
MSP=$4
PORT=$5
VERSION=$6

CORE_PEER_TLS_ENABLED=true
ORDERER_SYSCHAN_ID=system-channel

CORE_PEER_LOCALMSPID=$MSP
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/organizations/peerOrganizations/$ORG.healthchain.com/peers/$PEER.$ORG.healthchain.com/tls/ca.crt
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/organizations/peerOrganizations/$ORG.healthchain.com/users/Admin@$ORG.healthchain.com/msp
CORE_PEER_ADDRESS=$PEER.$ORG.healthchain.com:$PORT

ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/organizations/ordererOrganizations/blc.healthchain.com/orderers/orderer.blc.healthchain.com/msp/tlscacerts/tlsca.blc.healthchain.com-cert.pem
ORDERER=orderer.blc.healthchain.com:7050
CHANNEL_NAME="mainchannel"

echo "Adding Anchor Peer with details $ORG $MSP $PORT"

# 2.
peer channel fetch config config_block.pb \
    -o $ORDERER -c $CHANNEL_NAME \
    --tls --cafile $ORDERER_CA

# 3.
configtxlator proto_decode \
    --input ./config_block.pb --type common.Block \
    --output config_block.json

# 5.
jq .data.data[0].payload.data.config config_block.json >${CORE_PEER_LOCALMSPID}config.json

# 6.
jq '.channel_group.groups.Application.groups.'${CORE_PEER_LOCALMSPID}'.values += {"AnchorPeers":{"mod_policy": "Admins","value":{"anchor_peers": [{"host": "'peer0.$ORG.healthchain.com'","port": '$PORT'}]},"version": "0"}}' ${CORE_PEER_LOCALMSPID}config.json >${CORE_PEER_LOCALMSPID}modified_config.json

createConfigUpdate() {
    CHANNEL=$1
    ORIGINAL=$2
    MODIFIED=$3
    OUTPUT=$4

    configtxlator proto_encode --input "${ORIGINAL}" --type common.Config >original_config.pb
    configtxlator proto_encode --input "${MODIFIED}" --type common.Config >modified_config.pb
    configtxlator compute_update --channel_id "${CHANNEL}" --original original_config.pb --updated modified_config.pb >config_update.pb
    configtxlator proto_decode --input config_update.pb --type common.ConfigUpdate >config_update.json
    echo '{"payload":{"header":{"channel_header":{"channel_id":"'$CHANNEL'", "type":2}},"data":{"config_update":'$(cat config_update.json)'}}}' | jq . >config_update_in_envelope.json
    configtxlator proto_encode --input config_update_in_envelope.json --type common.Envelope >"${OUTPUT}"
}

# 7.
createConfigUpdate ${CHANNEL_NAME} ${CORE_PEER_LOCALMSPID}config.json ${CORE_PEER_LOCALMSPID}modified_config.json ${CORE_PEER_LOCALMSPID}anchors.tx

peer channel update -o $ORDERER -c $CHANNEL_NAME \
    -f ${CORE_PEER_LOCALMSPID}anchors.tx --tls \
    --cafile $ORDERER_CA >&log.txt

cat log.txt
