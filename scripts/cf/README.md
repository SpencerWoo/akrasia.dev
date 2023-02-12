Created as a Jenkins job to automate domain testing and abstracting CF permissions.

Instead of rewriting in shell, we're using it here.

# add
provide IP, domainName, and dnsType

# delete
provide IP to remove all entries

---

`CF_API_TOKEN` is `Zone:Read, DNS:Edit` -- technically we can hardcode the zoneId but for now we're fetching dynamically