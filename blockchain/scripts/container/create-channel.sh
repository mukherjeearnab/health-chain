CHANNEL_NAME="mainchannel"
MAX_RETRY=10
DELAY=10

BLOCKFILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/channel-artifacts/${CHANNEL_NAME}.block
ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/organizations/ordererOrganizations/blc.healthchain.com/orderers/orderer.blc.healthchain.com/msp/tlscacerts/tlsca.blc.healthchain.com-cert.pem

CORE_PEER_LOCALMSPID=NationalMSP
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/organizations/peerOrganizations/id1.national.healthchain.com/peers/peer0.id1.national.healthchain.com/tls/ca.crt
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/organizations/peerOrganizations/id1.national.healthchain.com/users/Admin@id1.national.healthchain.com/msp
CORE_PEER_ADDRESS=peer0.id1.national.healthchain.com:13132

CORE_PEER_TLS_ENABLED=true
ORDERER_SYSCHAN_ID=system-channel

echo "Creating channel ${CHANNEL_NAME}, and adding $CORE_PEER_ADDRESS with MSP_ID $CORE_PEER_LOCALMSPID"

sleep $DELAY

# Poll in case the raft leader is not set yet
peer channel create -o orderer.blc.healthchain.com:14132 \
    -c $CHANNEL_NAME \
    --ordererTLSHostnameOverride orderer.blc.healthchain.com \
    -f ./channel-artifacts/${CHANNEL_NAME}.tx \
    --outputBlock $BLOCKFILE \
    --tls \
    --cafile $ORDERER_CA >&log.txt

cat log.txt

echo "Channel '$CHANNEL_NAME' created"
