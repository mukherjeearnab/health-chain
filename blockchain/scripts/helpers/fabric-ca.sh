WORKDIR=$PWD

cd ./gen

mkdir fabric-ca

cd fabric-ca

mkdir id1.local.healthchain.com
mkdir id2.local.healthchain.com
mkdir id1.state.healthchain.com
mkdir id1.national.healthchain.com

cp ../../config/fabric-ca/fabric-ca.yml ./id1.local.healthchain.com/fabric-ca-server-config.yaml
cp ../../config/fabric-ca/fabric-ca.yml ./id2.local.healthchain.com/fabric-ca-server-config.yaml
cp ../../config/fabric-ca/fabric-ca.yml ./id1.state.healthchain.com/fabric-ca-server-config.yaml
cp ../../config/fabric-ca/fabric-ca.yml ./id1.national.healthchain.com/fabric-ca-server-config.yaml

cd $WORKDIR
