#!/bin/bash

# ./deploy.sh akrasia.dev

if [ -z "$1" ]
  then
    echo "No bucket supplied"
    exit 1
elif [ -z "$2" ]
  then
    echo "No localsrc supplied"
    exit 1
fi

BUCKET=$1
LOCALSRC=$2
gsutil -m rsync -R $LOCALSRC gs://$BUCKET

gsutil iam ch allUsers:objectViewer gs://$BUCKET

gsutil web set -m index.html gs://$BUCKET