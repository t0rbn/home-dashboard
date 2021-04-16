#!/bin/bash


cd client
npm install
npm run build
cd ..

cd server
npm install

rm -rf dist
npm run build
mkdir dist/client
cd ..

cp client/dist/* server/dist/client -r




