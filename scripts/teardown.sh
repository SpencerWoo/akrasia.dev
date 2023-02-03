#!/bin/bash

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

# 0)
# https://cloud.google.com/load-balancing/docs/quotas
# https://cloud.google.com/compute/quotas

# 0)
# domain verification
# https://search.google.com/u/5/search-console/welcome

# 0)
# auth GCP
# gcloud auth login

# PROJECT_ID=$(gcloud projects list --limit=1 --format 'value(project_id)')
# gcloud config set project $PROJECT_ID

gcloud compute forwarding-rules delete $BUCKET-lb-forwarding-rule --quiet
gcloud compute target-http-proxies delete $BUCKET-lb-proxy --quiet
gcloud compute url-maps delete $BUCKET-lb --quiet
gcloud compute backend-buckets delete $BUCKET_BACKEND --quiet
gcloud storage rm --recursive gs://$BUCKET
# gcloud storage rm delete $BUCKET --quiet

# 5)
# delete existing rxecord
# (cd scripts/cf/ && ./run-delete.sh $DOMAIN $DOMAIN)
(cd scripts/cf && ./run-delete.sh $DOMAIN $BUCKET)

# add new A record
DNS_TYPE='A'
IP_ADDR=$(gcloud compute forwarding-rules list --filter name=$BUCKET-lb-forwarding-rule --format 'value(IPAddress)')

# (cd scripts/cf && ./run-add.sh $DOMAIN $IP_ADDR $DOMAIN $DNS_TYPE)
(cd scripts/cf && ./run-add.sh $DOMAIN $IP_ADDR $BUCKET $DNS_TYPE)

