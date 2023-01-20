#!/bin/bash

# Set the domain and your Cloudflare API key and email
D="example.com"
API_KEY="1234567890abcdef"
API_EMAIL="user@example.com"

# Get the zone ID for the domain
ZONE_ID=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=$D" \
-H "X-Auth-Email: $API_EMAIL" \
-H "X-Auth-Key: $API_KEY" \
-H "Content-Type: application/json" \
| jq -r '.result[0].id')

# Get the DNS records for the domain
RECORDS=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
-H "X-Auth-Email: $API_EMAIL" \
-H "X-Auth-Key: $API_KEY" \
-H "Content-Type: application/json" \
| jq -r '.result[] | select(.name == "'$D'")')

# Delete each DNS record
for R in $RECORDS; do
  RECORD_ID=$(echo $R | jq -r '.id')
  curl -s -X DELETE "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$RECORD_ID" \
  -H "X-Auth-Email: $API_EMAIL" \
  -H "X-Auth-Key: $API_KEY" \
  -H "Content-Type: application/json"
done
