#!/bin/bash

pushd uploader-recny-model
echo "REACT_APP_API_URL_TRANSCRIPT=$BACKEND_URL_RECOG" > .env
echo "REACT_APP_API_URL_SLOWNIK=$BACKEND_URL_DICT" >> .env
echo "REACT_APP_API_URL_DUBBING=$BACKEND_URL_DUBBING" >> .env
popd

cd uploader-recny-model && npm start
