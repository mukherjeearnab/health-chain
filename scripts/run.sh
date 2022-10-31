WORKDIR=$PWD

echo "Preparing Blockchain Config Files...."
cd blockchain
sudo bash ./scripts/generate.sh
cd $WORKDIR

echo "Building Images...."
bash ./scripts/build-images.sh
cd $WORKDIR

echo "Orchestrating the network...."
docker-compose -p "healthchain" $(find docker blockchain/docker -maxdepth 1 -name "docker-compose*.yml" | sed -e 's/^/-f /') up -d

echo "Finishing Setup of Blockchain Network...."
cd blockchain
bash ./scripts/setup.sh
cd $WORKDIR

echo "HealthChain Network is up and running."
