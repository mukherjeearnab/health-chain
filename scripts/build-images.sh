WORKDIR=$PWD

echo "Building Local L1"
cd ./local/l1-data-layer
docker build -t api.l1.local.healthchain.com .
cd $WORKDIR

echo "Building Local L2"
cd ./local/l2-function-layer
docker build -t api.l2.local.healthchain.com .
cd $WORKDIR

echo "Building State L1"
cd ./state/l1-data-layer
docker build -t api.l1.state.healthchain.com .
cd $WORKDIR

echo "Building State L2"
cd ./state/l2-function-layer
docker build -t api.l2.state.healthchain.com .
cd $WORKDIR

echo "Building National L1"
cd ./national/l1-data-layer
docker build -t api.l1.national.healthchain.com .
cd $WORKDIR

echo "Building National L2"
cd ./national/l2-function-layer
docker build -t api.l2.national.healthchain.com .
cd $WORKDIR

echo "Building Network Registry"
cd ./registry/
docker build -t api.registry.healthchain.com .
cd $WORKDIR

echo "Building Blockchain API Service"
cd ./blockchain/api
docker build -t api.blc.healthchain.com .
cd $WORKDIR
