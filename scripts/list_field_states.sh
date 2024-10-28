#!/bin/bash

curl 'https://test-seed.rooch.network/' \
  -H 'accept: */*' \
  -H 'accept-language: en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6' \
  -H 'content-type: application/json' \
  -H 'origin: http://localhost:5173' \
  -H 'priority: u=1, i' \
  -H 'referer: http://localhost:5173/' \
  -H 'sec-ch-ua: "Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: cross-site' \
  -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36' \
  --data-raw '{"jsonrpc":"2.0","id":1,"method":"rooch_listFieldStates","params":["0x63ed0061d7e14544cf8bbceab209d87a7d9a615d8128e4cb9507377aaf37f737",null,null,{"decode":true}]}'
