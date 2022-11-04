echo "Generating binaries folder...."
mkdir generated
mkdir generated/bin

if [ ! -f ./generated/bin/docker-compose ]; then
    echo "Downloading Docker Compose Binaries...."
    wget https://github.com/docker/compose/releases/download/1.29.2/docker-compose-Linux-x86_64 \
        -P ./generated/bin -O ./generated/bin/docker-compose

    chmod +x ./generated/bin/*

    ls -la ./generated/bin
else
    echo "Docker Compose Binaries already available. Skipping Download...."
fi

./generated/bin/docker-compose -v
