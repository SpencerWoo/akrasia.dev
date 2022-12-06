#!/bin/bash

DOMAIN='akrasia.dev'
gsutil rsync -R src gs://$DOMAIN

gsutil iam ch allUsers:objectViewer gs://$DOMAIN

gsutil web set -m index.html gs://akrasia.dev