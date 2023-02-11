#!/bin/bash

# cat ~/.ssh/id_rsa.pub
# vim ~/.ssh/authorized_keys

# ssh user@ipv4
ipv4=$(terraform -chdir=terra output -raw droplet_ipv4_address)
# ssh-keyscan $ipv4
# ssh-copy-id root@$ipv4

if [[ "$OSTYPE" =~ ^msys ]]; then
	pip install -r requirements.txt

	python _upload.py --server $ipv4 --username root
else
	pip3 install -r requirements.txt

	python3 _upload.py --server $ipv4 --username root
fi