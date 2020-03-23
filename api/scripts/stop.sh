#!/bin/bash
cd /home/ubuntu/girbil
sudo pm2 stop server.config.js || exit 0

sudo rm -rf /home/ubuntu/girbil/ || exit 0