# Acessar Vault no localhost:8200

```sh
docker exec -it vault /bin/sh
```

# Abra o terminal do vault container e execute

```sh
export VAULT_ADDR='http://127.0.0.1:8200'
export VAULT_TOKEN=<TOKEN>

```

# Executa o comando para habilitar a rota

```sh
vault secrets enable -path=users/kv kv
```

# Configure as multiplas keys para desbloquear os vault no inicializdor

# Faca o login no vault usando o token de acesso gerado no inicializador

```sh
vault login
```
