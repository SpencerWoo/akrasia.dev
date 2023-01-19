#!/bin/bash

# npm run build

BUCKET='prng-subdomain-test'
gsutil -m rsync -R ../public gs://$BUCKET

gsutil iam ch allUsers:objectViewer gs://$BUCKET

gsutil web set -m index.html gs://$BUCKET