WORKDIR=$PWD

echo "Cleaning Existing Configs"
bash ./scripts/clean.sh

echo "Downloading Fabric Binaries"
bash ./scripts/helpers/download-bins.sh

echo "Generating PKI Materials"
bash ./scripts/helpers/cryptogen.sh

echo "Generating Genesis Block"
bash ./scripts/helpers/genesis-block.sh

echo "Copying Fabric CA Server Config Files"
bash ./scripts/helpers/fabric-ca.sh

echo "Generating CCP Connection Profiles"
bash ./scripts/helpers/ccp-generate.sh \
    id1.national 13132 13135 National

bash ./scripts/helpers/ccp-generate.sh \
    id1.state 12132 12135 State1

bash ./scripts/helpers/ccp-generate.sh \
    id1.local 11132 11135 Local1

bash ./scripts/helpers/ccp-generate.sh \
    id2.local 11232 11235 Local2
