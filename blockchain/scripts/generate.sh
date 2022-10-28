WORKDIR=$PWD

echo "Cleaning Existing Configs"
bash ./scripts/clean.sh

echo "Downloading Fabric Binaries"
bash ./scripts/helpers/download-bins.sh

echo "Generating PKI Materials"
bash ./scripts/helpers/cryptogen.sh

echo "Generating Genesis Block"
bash ./scripts/helpers/genesis-block.sh
