cat ./config/configtx/local.1.yml ./config/configtx/local.2.yml ./config/configtx/state.1.yml ./config/configtx/national.yml ./config/configtx/common.yml >./gen/configtx.yml

cd ./gen

mkdir system-genesis-block

./bin/configtxgen -profile HealthChainOrdererGenesis -channelID system-channel -outputBlock ./system-genesis-block/genesis.block
