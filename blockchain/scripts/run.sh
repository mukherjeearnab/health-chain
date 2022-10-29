echo "Orchestrating the Blockchain Network...."
bash ./scripts/helpers/network-up.sh

echo "Creating Communication Channel for Org Peers"
bash ./scripts/helpers/create-channel.sh
