CHAINCODE=$1
PEER=$2
ORG=$3
MSP=$4
PORT=$5
VERSION=$6

CORE_PEER_LOCALMSPID=$MSP
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/organizations/peerOrganizations/$ORG.healthchain.com/peers/$PEER.$ORG.healthchain.com/tls/ca.crt
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/organizations/peerOrganizations/$ORG.healthchain.com/users/Admin@$ORG.healthchain.com/msp
CORE_PEER_ADDRESS=$PEER.$ORG.healthchain.com:$PORT

CORE_PEER_TLS_ENABLED=true
ORDERER_SYSCHAN_ID=system-channel

echo "Post Installation Steps for $CHAINCODE with Version $VERSION"

echo "Querying Chaincode"
# Query the installed Chaincodes
peer lifecycle chaincode queryinstalled >&log.txt
cat log.txt
PACKAGE_ID=$(sed -n "/${CHAINCODE}_${VERSION}/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
echo "Found Chaincode with Package: $PACKAGE_ID"

echo "Approve Chaincode"
ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/organizations/ordererOrganizations/blc.healthchain.com/orderers/orderer.blc.healthchain.com/msp/tlscacerts/tlsca.blc.healthchain.com-cert.pem
ORDERER=orderer.blc.healthchain.com:7050
CHANNEL_NAME="mainchannel"

peer lifecycle chaincode approveformyorg \
    -o orderer.blc.healthchain.com:7050 --tls --cafile $ORDERER_CA \
    --channelID $CHANNEL_NAME --name $CHAINCODE \
    --version $VERSION --package-id $PACKAGE_ID \
    --sequence 1 --init-required >&log.txt

cat log.txt

echo "Check Commit Readiness"
peer lifecycle chaincode checkcommitreadiness \
    --channelID $CHANNEL_NAME --name $CHAINCODE \
    --version $VERSION --sequence 1 \
    --init-required --output json >&log.txt

cat log.txt
