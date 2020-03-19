curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -

sudo apt-get install -y nodejs nginx build-essential g++ node-gyp

# mginx config
sudo echo `
server {
  listen 80;
  server_name your_domain.com;
  location / {
    proxy_pass http://localhost:8081;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
   }
}
` >> /etc/nginx/conf.d/giribil.conf

# To verify nginx configuration
sudo nginx -t
# Restart nginx
sudo service nginx restart

# yarn setup
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt update && sudo apt install yarn

# pm2 setup
yarn add global pm2


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
