CHANNEL_NAME="mainchannel"

cat ./config/configtx/local.1.yml \
    ./config/configtx/local.2.yml \
    ./config/configtx/state.1.yml \
    ./config/configtx/national.yml \
    ./config/configtx/common.yml >./gen/configtx.yml

cd ./gen

mkdir system-genesis-block
mkdir channel-artifacts

cd ..

./gen/bin/configtxgen -configPath ./gen \
    -profile HealthChainOrdererGenesis \
    -channelID system-channel \
    -outputBlock ./gen/system-genesis-block/genesis.block

./gen/bin/configtxgen -configPath ./gen \
    -profile HealthChainChannel \
    -outputCreateChannelTx ./gen/channel-artifacts/${CHANNEL_NAME}.tx \
    -channelID $CHANNEL_NAME
