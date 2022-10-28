WORKDIR=$PWD

echo "Downloading Fabric Binaries"
bash ./scripts/helpers/download-bins.sh

echo "Generating PKI Materials"
bash ./scripts/helpers/cryptogen.sh
