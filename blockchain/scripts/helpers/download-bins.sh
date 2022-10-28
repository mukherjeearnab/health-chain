# wget https://github.com/hyperledger/fabric/releases/download/v2.2.4/hyperledger-fabric-linux-amd64-2.2.4.tar.gz -P gen

wget http://localhost:3000/hyperledger-fabric-linux-amd64-2.2.4.tar.gz -P gen

tar -xzvf ./gen/hyper*.tar.gz --directory ./gen/

chmod +x ./gen/bin/*

ls -la ./gen/bin
