#!/bin/bash

BUCKET='prng-subdomain-test'
BUCKET_BACKEND='prng'

gcloud compute forwarding-rules delete $BUCKET-lb-forwarding-rule

gcloud compute target-http-proxies delete $BUCKET-lb-proxy

gcloud compute url-maps delete $BUCKET-lb

gcloud compute backend-buckets delete $BUCKET_BACKEND

# gcloud storage buckets delete $BUCKET
