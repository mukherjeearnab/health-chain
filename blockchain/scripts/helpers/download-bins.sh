if [ ! -f ./bin/hyper*.tar.gz ]; then
    echo "Downloading Fabric Binaries...."
    wget https://github.com/hyperledger/fabric/releases/download/v2.2.0/hyperledger-fabric-linux-amd64-2.2.0.tar.gz -P bin

    # wget http://localhost:3000/hyperledger-fabric-linux-amd64-2.2.0.tar.gz -P gen

    tar -xzvf ./bin/hyper*.tar.gz --directory ./bin/

    chmod +x ./bin/bin/*

else
    echo "Fabric Binaries already available. Skipping Download...."
fi

ls -la ./bin/bin
