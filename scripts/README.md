# scripts

current scripts to host on digitalocean

# requirements

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash`
`. ~/.nvm/nvm.sh`

```
py -m venv .venv
source .venv/bin/activate
py -m pip install -r requirements.txt
```

# deploy
`./create.sh`

# update
`./update.sh`

# debug
`./connect.sh`

`cd /etc/nginx/sites-available/`
`cd /var/www/spencers.dev/html/`

# todo

* rewrite python script to node
