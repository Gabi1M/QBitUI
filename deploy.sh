#!/bin/bash

cd .
source configs/release.sh
if [[ -z "${DEPLOY_PATH}" ]]
then
    echo "Deploy path not set. Please set DEPLOY_PATH env var to desired path"
    exit
else
    read -p "Deploying to ${DEPLOY_PATH}. Continue? (Y/N): " confirm
    if [[ $confirm == [yY] ]];
    then
        rm -rf build/
        yarn build
        rm -rf ${DEPLOY_PATH}
        mkdir -p ${DEPLOY_PATH}
        cp -r build/* ${DEPLOY_PATH}
    else
        exit
    fi
fi