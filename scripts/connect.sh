#!/bin/bash

ipv4=$(terraform -chdir=terra output -raw droplet_ipv4_address)

echo 'Connecting to '
echo $ipv4

ssh root@$ipv4