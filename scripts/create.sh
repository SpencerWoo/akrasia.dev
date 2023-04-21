#!/bin/bash

# ======================
# 0) PREREQUISITES
./_init.sh

# ======================
# 1) CREATE PLAN
terraform -chdir=terra plan -var "do_token=${D_PAT}" -var "pvt_key=$HOME/.ssh/id_rsa" -input=false -out=tfplan

sleep 5

echo '
		Creating DO droplet.
		'

# # ======================
# # 2) APPLY PLAN
terraform -chdir=terra apply -input=false tfplan

sleep 180

ipv4=$(terraform -chdir=terra output -raw droplet_ipv4_address)
ipv6=$(terraform -chdir=terra output -raw droplet_ipv6_address)

echo '
		Successfully created DO droplet : ${ipv4}
		'
echo $ipv4

# ======================
# 3) Create CF DNS entry
domain='akrasia.dev'
type='A'

echo '
		Creating CF record for domain.

		'

# primary is CNAME
# (cd cf && ./run-add.sh $ipv4 $domain $type)

# Create CF DNS entries for subdomains as well...
(cd cf && ./run-add.sh $ipv4 cyberchef $type)
(cd cf && ./run-add.sh $ipv4 generalized $type)
(cd cf && ./run-add.sh $ipv4 k8s $type)
(cd cf && ./run-add.sh $ipv4 mazechallenger $type)
(cd cf && ./run-add.sh $ipv4 metaljs $type)
(cd cf && ./run-add.sh $ipv4 puzzle $type)
(cd cf && ./run-add.sh $ipv4 prng $type)
(cd cf && ./run-add.sh $ipv4 sennajs $type)
(cd cf && ./run-add.sh $ipv4 talon $type)


echo '
		Successfully added A records.
		'

# ======================
# 4) Add server to known_hosts
ssh-copy-id root@$ipv4
# cat ~/.ssh/id_rsa.pub | ssh root@$ipv4 'cat >> ~/.ssh/authorized_keys'

# ======================
# 5) Upload compiled websites

./update.sh

# 6) Validate setup
# dig and liveness