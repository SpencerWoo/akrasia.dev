# domains

1. akrasia.dev


2. talon.akrasia.dev
3. prng.akrasia.dev
4. sennajs.akrasia.dev
5. metaljs.akrasia.dev
6. cyberchef.akrasia.dev

# config

```sh
./scripts/setup.sh cyberchef cyberchef-be akrasia.dev ../cyberchef
./scripts/setup.sh metaljs metaljs-be akrasia.dev ../metaljs
./scripts/setup.sh prng prng-be akrasia.dev ../prng/public
./scripts/setup.sh sennajs sennajs-be akrasia.dev ../sennajs
./scripts/setup.sh talon talon-be akrasia.dev ../talon
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