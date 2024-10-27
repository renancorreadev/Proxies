---
sidebar_position: 5
---

# Endpoints de Autenticação e Usuários

## Introdução

Os **endpoints de Autenticação** e **Usuários** permitem o registro de novos usuários, autenticação via Keycloak e a gestão de contas. Esses endpoints são essenciais para garantir o acesso seguro ao ecossistema Loyahub e o gerenciamento de dados de usuários.

## Endpoints e Uso

### 1. Autenticação de Usuário

**POST** `/api/v1/auth/login`  
Autentica um usuário e retorna um token de acesso.

#### Requisição Curl

```bash
curl -X POST https://api.loyahub.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "password123"
  }'
```

**Exemplo de Resposta:**

```json
{
  "accessToken": "eyJhbGciOi...",
  "refreshToken": "dGhpcyBpcyBh..."
}
```

### 2. Login com Keycloak

**POST** `/api/v1/auth/keycloak/login`  
Autentica um usuário via Keycloak e retorna um token.

#### Requisição Curl

```bash
curl -X POST https://api.loyahub.com/api/v1/auth/keycloak/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "janedoe",
    "password": "mypassword"
  }'
```

**Exemplo de Resposta:**

```json
{
  "accessToken": "eyJhbGciOi...",
  "refreshToken": "c29tZSBzZWNyZXQ..."
}
```

### 3. Renovar Token

**POST** `/api/v1/auth/keycloak/refresh`  
Gera um novo token de acesso usando um refresh token.

#### Requisição Curl

```bash
curl -X POST https://api.loyahub.com/api/v1/auth/keycloak/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "c29tZSBzZWNyZXQ..."
  }'
```

**Exemplo de Resposta:**

```json
{
  "newAccessToken": "eyJhbGciOi..."
}
```

### 4. Registrar Novo Usuário

**POST** `/api/v1/user/register`  
Cria uma nova conta de usuário.

#### Requisição Curl

```bash
curl -X POST https://api.loyahub.com/api/v1/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao.silva@example.com",
    "password": "senhasegura"
  }'
```

**Exemplo de Resposta:**

```json
{
  "message": "Usuário registrado com sucesso",
  "userId": 1
}
```

### 5. Atualizar Informações do Usuário

**PATCH** `/api/v1/user/update`  
Atualiza os dados de um usuário existente.

#### Requisição Curl

```bash
curl -X PATCH https://api.loyahub.com/api/v1/user/update \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "name": "João Silva Atualizado"
  }'
```

**Exemplo de Resposta:**

```json
{
  "message": "Usuário atualizado com sucesso"
}
```

### 6. Deletar Usuário

**DELETE** `/api/v1/user/delete`  
Exclui uma conta de usuário.

#### Requisição Curl

```bash
curl -X DELETE https://api.loyahub.com/api/v1/user/delete \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1
  }'
```

**Exemplo de Resposta:**

```json
{
  "message": "Usuário deletado com sucesso"
}
```

## Conclusão

Os **endpoints de Autenticação e Usuários** garantem acesso seguro ao ecossistema Loyahub, permitindo registro, autenticação e gestão de contas. A integração com o Keycloak garante controle eficiente e seguro de acesso.
