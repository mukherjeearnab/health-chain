PEER=$1
ORG=$2
MSP=$3
PORT=$4

DELAY=10

CHANNEL_NAME="mainchannel"

ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/health.com/orderers/orderer0.health.com/msp/tlscacerts/tlsca.health.com-cert.pem

CORE_PEER_LOCALMSPID=$MSP
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/organizations/peerOrganizations/$ORG.healthchain.com/peers/$PEER.$ORG.healthchain.com/tls/ca.crt
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/organizations/peerOrganizations/$ORG.healthchain.com/users/Admin@$ORG.healthchain.com/msp
CORE_PEER_ADDRESS=$PEER.$ORG.healthchain.com:$PORT

CORE_PEER_TLS_ENABLED=true
ORDERER_SYSCHAN_ID=system-channel

BLOCKFILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/channel-artifacts/${CHANNEL_NAME}.block

echo "Joining $PEER.$ORG.healthchain.com to $CHANNEL_NAME, with MSP_ID $MSP on PORT $PORT"

sleep $DELAY

peer channel join -b $BLOCKFILE >&log.txt

cat log.txt
