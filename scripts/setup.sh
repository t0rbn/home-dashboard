#!/bin/bash
echo "### Setting up systemd service ###"
cd ~/home-dashboard
sudo cp docs/home-dashboard.service /etc/systemd/system
sudo systemctl daemon-reload
sudo systemctl enable hom-dashboard.service

