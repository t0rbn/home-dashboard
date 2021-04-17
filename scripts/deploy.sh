#!/bin/bash
SCP_USER="raspberry"
SCP_HOST="192.168.0.1"
TMP_DIR="/tmp/home-dashboard-build"



clear
echo "########################################"
echo "# Creating Bundle                      #"
echo "########################################"

rm -rf $TMP_DIR
mkdir $TMP_DIR

cd ../server
rm -rf dist
cp package.json $TMP_DIR
npm install
npm run build
cp dist/* $TMP_DIR -r

cd ../client
npm install
npm run build
mkdir $TMP_DIR/client
cp dist/* $TMP_DIR/client -r


clear
echo "########################################"
echo "# Transferring Bundle                  #"
echo "########################################"

cd $TMP_DIR
echo ""
echo "Copying files to destination..."
scp -r * pi@192.168.0.118:~/home-dashboard-deployment

echo ""
echo "Installing npm dependencies on destination..."
ssh pi@192.168.0.118 "cd home-dashboard-deployment && npm install"



clear
echo "########################################"
echo "# Server SystemD Unit                  #"
echo "########################################"

echo "Restart Server Unit? [y/N]"
read -n 1 RESTART_SERVER
if [ $RESTART_SERVER == "y" ]; then
  ssh pi@192.168.0.118 "sudo systemctl restart home-dashboard.service"
fi

echo "########################################"
echo "# Deployment Finished                  #"
echo "########################################"

