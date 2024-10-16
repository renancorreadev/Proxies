# initialize vault

docker exec -it vault vault operator init


# exempl: 
# Unseal Key 1: <chave-1>
# Unseal Key 2: <chave-2>
# Unseal Key 3: <chave-3>
# Root Token: <token-de-root>


# unseal vault desbloqear as chaves
docker exec -it vault vault operator unseal key1
docker exec -it vault vault operator unseal key2
docker exec -it vault vault operator unseal key3

docker exec -it vault vault login tokenkey

