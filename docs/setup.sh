#!/bin/bash
echo "### Installing backend dependencies ###"
cd ~/home-dashboard/local
npm install

echo "### Setting up systemd service ###"
cd ~/home-dashboard
sudo cp docs/home-dashboard-local.service /etc/systemd/system
sudo systemctl daemon-reload
sudo systemctl enable home-dashboard-local.service

echo "### Installing nginx ###"
cd ~
sudo apt install
mkdir home-dashboard-nginx
sudo cp home-dashboard/docs/nginx.conf /etc/nginx/nginx.conf
sudo systemctl enable nginx.service
sudo systemctl start nginx.service

echo "### Ready to deploy! ###"
