WORKDIR=$PWD

echo "Cleaning Existing Configs"
bash ./scripts/clean.sh

echo "Downloading Fabric Binaries"
bash ./scripts/helpers/download-bins.sh

echo "Generating PKI Materials"
bash ./scripts/helpers/cryptogen.sh

echo "Generating Genesis Block"
bash ./scripts/helpers/genesis-block.sh

echo "Generating CCP Connection Profiles"
bash ./scripts/helpers/ccp-generate.sh \
    id1.national 13132 13134 NationalMSP

bash ./scripts/helpers/ccp-generate.sh \
    id1.state 12132 12134 State1MSP

bash ./scripts/helpers/ccp-generate.sh \
    id1.local 11132 11134 Local1MSP

bash ./scripts/helpers/ccp-generate.sh \
    id2.local 11232 11234 Local2MSP
