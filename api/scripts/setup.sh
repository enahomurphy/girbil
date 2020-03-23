curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

sudo apt-get install -y nodejs nginx build-essential g++ node-gyp

# update default nginx to include this lines and comment out the second
# include /etc/nginx/conf.d/*.conf;
# include /etc/nginx/sites-enabled/*;

# mginx config
sudo echo `
server {
  listen 80 default_server;
	listen [::]:80 default_server;
  server_name localhost;
  location / {
    proxy_pass http://127.0.0.1:8081;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
   }
}
` >> /etc/nginx/conf.d/girbil.conf

# To verify nginx configuration
sudo nginx -t

# Restart nginx
sudo service nginx restart

# yarn setup
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt update && sudo apt install yarn

# pm2 setup
wget -qO- https://getpm2.com/install.sh | bash


# codeploy 
sudo apt-get install ruby

sudo apt-get install wget

# download and install codeploy agent
curl -O https://aws-codedeploy-us-west-2.s3.amazonaws.com/latest/install

chmod +x ./install

sudo ./install auto

# start agent service
sudo service codedeploy-agent start

sudo service codedeploy-agent status

# installation folder
mkdir /home/ubuntu/girbil

sudo chown -R ubuntu:ubuntu /home/ubuntu/girbil



## Debug code deploy
# [1]http://docs.aws.amazon.com/codedeploy/latest/userguide/how-to-create-iam-instance-profile.html
# [2] http://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting-general.html
# [3] http://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting.html

## Code deply logs
# tail -f /var/log/aws/codedeploy-agent/codedeploy-agent.log
