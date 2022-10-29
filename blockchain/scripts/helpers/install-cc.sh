CC_NAMES=$(ls ./contracts/ | grep _cc)

for CC in $CC_NAMES; do
    echo "Preparing to install $CC Chaincode...."
    docker exec -it healthchain_cli.blc.healthchain.com_1 \
        bash ./scripts/package-go-cc.sh \
        $CC peer0 id1.local Local1MSP 11132 1.0

    docker exec -it healthchain_cli.blc.healthchain.com_1 \
        bash ./scripts/install-go-cc.sh \
        $CC peer0 id1.local Local1MSP 11132 1.0

    docker exec -it healthchain_cli.blc.healthchain.com_1 \
        bash ./scripts/install-go-cc.sh \
        $CC peer0 id2.local Local2MSP 11232 1.0

    docker exec -it healthchain_cli.blc.healthchain.com_1 \
        bash ./scripts/install-go-cc.sh \
        $CC peer0 id1.state State1MSP 12132 1.0

    docker exec -it healthchain_cli.blc.healthchain.com_1 \
        bash ./scripts/install-go-cc.sh \
        $CC peer0 id1.national NationalMSP 13132 1.0

    echo "Post Install "$CC
    docker exec -it healthchain_cli.blc.healthchain.com_1 \
        bash ./scripts/post-cc-install.sh \
        $CC peer0 id1.local Local1MSP 11132 1.0

    docker exec -it healthchain_cli.blc.healthchain.com_1 \
        bash ./scripts/post-cc-install.sh \
        $CC peer0 id2.local Local2MSP 11232 1.0

    docker exec -it healthchain_cli.blc.healthchain.com_1 \
        bash ./scripts/post-cc-install.sh \
        $CC peer0 id1.state State1MSP 12132 1.0

    docker exec -it healthchain_cli.blc.healthchain.com_1 \
        bash ./scripts/post-cc-install.sh \
        $CC peer0 id1.national NationalMSP 13132 1.0

    echo "Committing "$CC
    docker exec -it healthchain_cli.blc.healthchain.com_1 \
        bash ./scripts/commit-cc.sh \
        $CC peer0 id1.national NationalMSP 13132 1.0

done
