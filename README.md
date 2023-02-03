# domains

* akrasia.dev

# sub-domains

1. talon.akrasia.dev
2. prng.akrasia.dev

# config

1. Compile websites

2. Deploy websites
```sh
./scripts/setup.sh prng prng-be akrasia.dev ../prng/public
./scripts/setup.sh talon talon-be akrasia.dev ../talon
```

# deploy

* Configure GCP CLI auth
* run `./scripts/deploy.sh BUCKET LOCALSRC`

# notes

Compiled websites from
1. [prng](https://github.com/spencermwoo/randomness-in-programming-languages)
2. [talon](https://github.com/chaosparrot/talon_practice)