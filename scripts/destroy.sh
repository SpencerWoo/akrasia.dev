#!/bin/bash

ipv4=$(terraform -chdir=terra output -raw droplet_ipv4_address)
ipv6=$(terraform -chdir=terra output -raw droplet_ipv6_address) 

(cd cf && ./run-delete.sh $ipv4)

terraform -chdir=terra destroy -var "do_token=${D_PAT}" -var "pvt_key=$HOME/.ssh/id_rsa" -auto-approve