# nginx

```
sudo ln -s /etc/nginx/sites-available/akrasia.dev /etc/nginx/sites-enabled/

sudo ln -s /etc/nginx/sites-available/cyberchef.akrasia.dev /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/generalized.akrasia.dev /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/k8s.akrasia.dev /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/mazechallenger.akrasia.dev /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/metaljs.akrasia.dev /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/prng.akrasia.dev /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/sennajs.akrasia.dev /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/talon.akrasia.dev /etc/nginx/sites-enabled/
```

```
service nginx reload
systemctl restart nginx

nginx -t
nginx -T | grep "akrasia.dev"

tail -f /var/log/nginx/access.log
```