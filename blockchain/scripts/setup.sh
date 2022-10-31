echo "Creating Communication Channel for Org Peers"
bash ./scripts/helpers/create-channel.sh

echo "Joining Org Peers to Communication Channel"
bash ./scripts/helpers/join-channel.sh

echo "Installing Smart Contracts (Chaincodes)"
bash ./scripts/helpers/install-cc.sh
