#!/bin/bash

gsutil rsync -R src gs://akrasia.dev

gsutil iam ch allUsers:objectViewer gs://akrasia.dev