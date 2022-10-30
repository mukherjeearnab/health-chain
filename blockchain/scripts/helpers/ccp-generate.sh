ORG=$1
P0PORT=$2
CAPORT=$3
ORG_MSP=$4

PEERPEM=./gen/organizations/peerOrganizations/$ORG.healthchain.com/tlsca/tlsca.$ORG.healthchain.com-cert.pem
CAPEM=./gen/organizations/peerOrganizations/$ORG.healthchain.com/ca/ca.$ORG.healthchain.com-cert.pem

function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $4)
    local CP=$(one_line_pem $5)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${CAPORT}/$3/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        ./templates/ccp-template.json
}

# function yaml_ccp {
#     local PP=$(one_line_pem $4)
#     local CP=$(one_line_pem $5)
#     sed -e "s/\${ORG}/$1/" \
#         -e "s/\${P0PORT}/$2/" \
#         -e "s/\${CAPORT}/$3/" \
#         -e "s#\${PEERPEM}#$PP#" \
#         -e "s#\${CAPEM}#$CP#" \
#         ./templates/ccp-template.json | sed -e $'s/\\\\n/\\\n        /g'
# }

echo "Generating CCP for $ORG with MSP=$ORG_MSP PEER=$P0PORT CA=$CAPORT"

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" >./gen/organizations/peerOrganizations/$ORG.healthchain.com/connection-ccp.json
# echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" >./gen/organizations/peerOrganizations/$ORG.healthchain.com/connection-ccp.yaml
