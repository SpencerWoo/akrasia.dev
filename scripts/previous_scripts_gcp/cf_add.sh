#!/bin/bash

# Set the domain, your Cloudflare API key and email, and the DNS records
D="example.com"
API_KEY="1234567890abcdef"
API_EMAIL="user@example.com"
RECORDS=(
  '{"type": "A", "name": "example.com", "content": "192.0.2.1", "ttl": 1, "proxied": false}'
  '{"type": "AAAA", "name": "example.com", "content": "2001:db8::1", "ttl": 1, "proxied": false}'
  '{"type": "CNAME", "name": "www", "content": "example.com", "ttl": 1, "proxied": false}'
)

# Get the zone ID for the domain
ZONE_ID=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=$D" \
-H "X-Auth-Email: $API_EMAIL" \
-H "X-Auth-Key: $API_KEY" \
-H "Content-Type: application/json" \
| jq -r '.result[0].id')

# Add each DNS record
for R in "${RECORDS[@]}"; do
  curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -H "X-Auth-Email: $API_EMAIL" \
  -H "X-Auth-Key: $API_KEY" \
  -H "Content-Type: application/json" \
  --data "$R"
done
