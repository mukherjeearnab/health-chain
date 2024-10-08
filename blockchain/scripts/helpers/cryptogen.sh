ORG_NAMES=$(ls ./config/cryptogen/ | grep .yml)

for ORG in $ORG_NAMES; do
    echo "Generating "$ORG
    ./bin/bin/cryptogen generate --config=./config/cryptogen/$ORG --output="./gen/organizations"
done
