echo 'Image building...'
docker build -t kerimkaan/powerdns-manager:latest -f Dockerfile .
echo 'Pushing the Docker Hub...'
docker push kerimkaan/powerdns-manager:latest
echo 'Finished'