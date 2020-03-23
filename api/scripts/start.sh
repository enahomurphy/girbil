#!/bin/bash
cd /home/ubuntu/girbil

cp /home/ubuntu/.env /home/ubuntu/girbil

sudo yarn migrate
sudo yarn start