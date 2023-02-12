#!/bin/bash

# ======================
# 0) INIT
if [[ -z "${CF_API_TOKEN}" ]]; then
	echo "Missing CF_API_TOKEN.  Aborting."
	exit 1
fi

echo CF_API_TOKEN=${CF_API_TOKEN} > cf/.env

if [[ -z "${D_PAT}" ]]; then
	echo "Missing D_PAT.  Aborting."
	exit 1
fi

source ~/.nvm/nvm.sh
command -v nvm >/dev/null 2>&1 || { echo >&2 "nvm is required, but it's not installed.  Aborting."; exit 1; }

if [[ "$OSTYPE" =~ ^msys ]]; then
	py -m venv .
	py -m pip install --upgrade pip
else
	python3 -m venv .
	python3 -m pip install --upgrade pip3
fi

if [[ -d "bin" ]]; then
	source bin/activate
else
	source Scripts/activate
fi

# py -m pip install --upgrade pip
if [[ "$OSTYPE" =~ ^msys ]]; then
	pip install -r requirements.txt
else
	pip3 install -r requirements.txt
fi

terraform -chdir=terra init

nvm install 17.3.0
nvm use 17.3.0
# npm -v 8.3.0

# ssh-keygen