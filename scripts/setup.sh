#!/bin/bash

# https://cloud.google.com/load-balancing/docs/https/ext-load-balancer-backend-buckets#gcloudgsutil

# 0)
# domain verification
# https://search.google.com/u/5/search-console/welcome

# 0)
# auth GCP
gcloud auth login

PROJECT_ID=$(gcloud projects list --limit=1 --format 'value(project_id)')
gcloud config set project $PROJECT_ID

# 1)
# create storage bucket
DOMAIN='akrasia.dev'
gcloud storage buckets create gs://$DOMAIN

# 2)
# pull from repo and place into dir
# add SOURCE note into README - or even better add to version
git fetch origin
git pull origin

# 3)
# run ./deploy.sh
# upload to bucket and set policy
(cd scripts/cf && ./deploy.sh)

# 4)
# create L7 LB
gcloud compute backend-buckets create akrasia \
    --gcs-bucket-name=$DOMAIN

gcloud compute url-maps create http-lb \
    --default-backend-bucket=akrasia

gcloud compute target-http-proxies create http-lb-proxy \
    --url-map=http-lb

gcloud compute forwarding-rules create http-lb-forwarding-rule \
    --load-balancing-scheme=EXTERNAL \
    --network-tier=PREMIUM \
    --global \
    --target-http-proxy=http-lb-proxy \
    --ports=80

# add CF records
# 5)
# delete existing rxecord
(cd scripts/cf/ && ./run-delete.sh $DOMAIN $DOMAIN)

# add new A record
DNS_TYPE='A'
IP_ADDR=$(gcloud compute forwarding-rules list --format 'value(IPAddress)')

(cd scripts/cf && ./run-add.sh $DOMAIN $IP_ADDR $DOMAIN $DNS_TYPE)

