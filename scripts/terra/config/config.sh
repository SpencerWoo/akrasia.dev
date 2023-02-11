#!/bin/bash

# export PATH=$PATH:/usr/bin

# apt update
# apt install ngninx
apt-get -y update
apt-get -y install nginx

# domain=$1
domain="akrasia.dev"
root="/var/www/$domain/html"
block="/etc/nginx/sites-available/$domain"

# Create the Document Root directory
sudo mkdir -p $root

# Assign ownership to your regular user account
sudo chown -R 755 $USER:$USER $root

# Create the Nginx server block file:
sudo tee $block > /dev/null <<EOF
server {
        listen 80;
        listen [::]:80;

        root /var/www/$domain/html;
        index index.html index.htm index.nginx-debian.html;

        server_name $domain www.$domain;

        location / {
                try_files \$uri \$uri/ =404;
        }

        location ^~ /.well-known/ {
		    access_log           off;
		    log_not_found        off;
		    autoindex            off;
		    try_files            \$uri \$uri/ =404;
		}
}

EOF

# Link to make it available
sudo ln -s $block /etc/nginx/sites-enabled/

# Test configuration and reload if successful
sudo nginx -t && sudo service nginx reload

# systemctl restart nginx
