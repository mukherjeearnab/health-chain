WORKDIR=$PWD

function json_ccp {
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${CAPORT}/$2/" \
        ../../config/fabric-ca/fabric-ca.yml
}

cd ./gen

mkdir fabric-ca

cd fabric-ca

mkdir id1.local.healthchain.com
mkdir id2.local.healthchain.com
mkdir id1.state.healthchain.com
mkdir id1.national.healthchain.com

ORG=id1.local
CAPORT=11135
echo "$(json_ccp $ORG $CAPORT)" >./$ORG.healthchain.com/fabric-ca-server-config.yaml

ORG=id2.local
CAPORT=11235
echo "$(json_ccp $ORG $CAPORT)" >./$ORG.healthchain.com/fabric-ca-server-config.yaml

ORG=id1.state
CAPORT=12135
echo "$(json_ccp $ORG $CAPORT)" >./$ORG.healthchain.com/fabric-ca-server-config.yaml

ORG=id1.national
CAPORT=13135
echo "$(json_ccp $ORG $CAPORT)" >./$ORG.healthchain.com/fabric-ca-server-config.yaml

cd $WORKDIR
