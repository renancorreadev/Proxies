
1. Reset Database with postgree sql tables: customer, metadata, user_identity

table -> truncate restart identity

2. Delete all keys in vault in localhost:8082

3. Approve Drex to contract PointCore
```shell
curl -X 'POST' \
  'http://localhost:3001/api/v1/erc20/approveDrex' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "spender": "0xE3DD4B622F6212c97D4cD3fe8dC6C943825101a4",
  "amount": 1000
}'
```

