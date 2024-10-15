# initialize vault

docker exec -it vault vault operator init


# exempl: 
# Unseal Key 1: <chave-1>
# Unseal Key 2: <chave-2>
# Unseal Key 3: <chave-3>
# Root Token: <token-de-root>


# unseal vault desbloqear as chaves
docker exec -it vault vault operator unseal AB4Up9OmnbtQgM2ABo5+eqvz9VyogQWEYhYx8POvuI4N
docker exec -it vault vault operator unseal ACr/6CntpTMgLrJeSluOL/V5crKwJjs4PAjBZFzGUbGb
docker exec -it vault vault operator unseal 9iD8dFuxTs+XAWu2p+Y//52A9RhCAV3u5I2+/23V/138

docker exec -it vault vault login hvs.6g5J8LnPidUEQDXlwFqwtfmG

