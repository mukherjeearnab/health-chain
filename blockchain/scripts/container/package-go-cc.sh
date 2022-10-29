CHAINCODE=$1
PEER=$2
ORG=$3
MSP=$4
PORT=$5
VERSION=$6

WORKDIR=$PWD

echo "Installing Go Dependencies for Chaincode $CHAINCODE"
cd /usr/local/go/src/$CHAINCODE
GO111MODULE=on go mod vendor
cd $WORKDIR

echo "Packaging $CHAINCODE"
peer lifecycle chaincode package ${CHAINCODE}.tar.gz --path /usr/local/go/src/$CHAINCODE --lang golang --label ${CHAINCODE}_${VERSION} >&log.txt
cat log.txt
