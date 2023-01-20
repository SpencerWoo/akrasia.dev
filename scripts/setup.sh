#!/bin/bash

# ./scripts/setup.sh

# BUCKET, BACKEND, DOMAIN, LOCALSRC
# Assumptions:
    # CF assumes BUCKET is name of subdomain

# ./setup.sh prng prng-be akrasia.dev prng/public
# ./setup.sh talon talon-be akrasia.dev talon

if [ -z "$1" ]
  then
    echo "No bucket supplied"
    exit 1
elif [ -z "$2" ]
  then
    echo "No bucket backend supplied"
    exit 1
elif [ -z "$3" ]
  then
    echo "No domain supplied"
    exit 1
elif [ -z "$4" ]
  then
    echo "No src supplied"
    exit 1
fi

BUCKET=$1
BUCKET_BACKEND=$2
DOMAIN=$3
LOCALSRC=$4

# echo $BUCKET
# echo $BUCKET_BACKEND
# echo $DOMAIN

# https://cloud.google.com/load-balancing/docs/https/ext-load-balancer-backend-buckets#gcloudgsutil

# 0)
# domain verification
# https://search.google.com/u/5/search-console/welcome

# 0)
# auth GCP
# gcloud auth login

# PROJECT_ID=$(gcloud projects list --limit=1 --format 'value(project_id)')
# gcloud config set project $PROJECT_ID

# 1)
# create storage bucket
# BUCKET='akrasia.dev'
# DOMAIN=$BUCKET
gcloud storage buckets create gs://$BUCKET

# 2)
# pull from repo and place into dir
# add SOURCE note into README - or even better add to version
git fetch origin
git pull origin

# 3)
# run ./deploy.sh
# upload to bucket and set policy
(cd scripts/cf && ./deploy.sh $BUCKET $LOCALSRC)

# 4)
# create L7 LB
# BUCKET_BACKEND='akrasia'
gcloud compute backend-buckets create $BUCKET_BACKEND \
    --gcs-bucket-name=$BUCKET

gcloud compute url-maps create $BUCKET-lb \
    --default-backend-bucket=$BUCKET_BACKEND

gcloud compute target-http-proxies create $BUCKET-lb-proxy \
    --url-map=$BUCKET-lb

gcloud compute forwarding-rules create $BUCKET-lb-forwarding-rule \
    --load-balancing-scheme=EXTERNAL \
    --network-tier=PREMIUM \
    --global \
    --target-http-proxy=$BUCKET-lb-proxy \
    --ports=80

# add CF records
# 5)
# delete existing rxecord
(cd scripts/cf/ && ./run-delete.sh $DOMAIN $DOMAIN)
(cd scripts/cf/ && ./run-delete.sh $DOMAIN $BUCKET)

# add new A record
DNS_TYPE='A'
IP_ADDR=$(gcloud compute forwarding-rules list --filter name=$BUCKET-lb-forwarding-rule --format 'value(IPAddress)')

(cd scripts/cf && ./run-add.sh $DOMAIN $IP_ADDR $DOMAIN $DNS_TYPE)
(cd scripts/cf && ./run-add.sh $DOMAIN $IP_ADDR $BUCKET $DNS_TYPE)

