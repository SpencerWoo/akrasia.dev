# domains

* akrasia.dev

# sub-domains


1. talon.akrasia.dev
2. prng.akrasia.dev
3. sennajs.akrasia.dev
4. metaljs.akrasia.dev
5. cyberchef.akrasia.dev
6. k8s.akrasia.dev

# config

```sh
./scripts/setup.sh cyberchef cyberchef-be akrasia.dev ../cyberchef
./scripts/setup.sh metaljs metaljs-be akrasia.dev ../metaljs
./scripts/setup.sh prng prng-be akrasia.dev ../prng/public
./scripts/setup.sh sennajs sennajs-be akrasia.dev ../sennajs
./scripts/setup.sh talon talon-be akrasia.dev ../talon
./scripts/setup.sh k8s k8s-be akrasia.dev ../k8s
```

# deploy

* Configure GCP CLI auth
* run `./scripts/deploy.sh BUCKET LOCALSRC`

# notes

Compiled websites from
1. [talon](https://github.com/chaosparrot/talon_practice)
2. [cyberchef](https://github.com/gchq/CyberChef)
3. [sennajs](https://github.com/liferay/sennajs.com)
4. [metaljs](https://github.com/liferay/metaljs.com)
5. [k8s](https://github.com/kubernetes/website)