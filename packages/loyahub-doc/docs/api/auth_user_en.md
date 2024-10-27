---
sidebar_position: 5
---

# Authentication and User Endpoints

## Introduction

The **Authentication** and **User** endpoints enable user registration, authentication through Keycloak, and account management. These endpoints are essential for secure access to the Loyahub ecosystem and user data management.

## Endpoints and Usage

### 1. User Authentication

**POST** `/api/v1/auth/login`  
Authenticates a user and returns an access token.

#### Curl Request

```bash
curl -X POST https://api.loyahub.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "password123"
  }'
```

**Example Response:**

```json
{
  "accessToken": "eyJhbGciOi...",
  "refreshToken": "dGhpcyBpcyBh..."
}
```

### 2. Keycloak Login

**POST** `/api/v1/auth/keycloak/login`  
Authenticates a user via Keycloak and returns a token.

#### Curl Request

```bash
curl -X POST https://api.loyahub.com/api/v1/auth/keycloak/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "janedoe",
    "password": "mypassword"
  }'
```

**Example Response:**

```json
{
  "accessToken": "eyJhbGciOi...",
  "refreshToken": "c29tZSBzZWNyZXQ..."
}
```

### 3. Refresh Token

**POST** `/api/v1/auth/keycloak/refresh`  
Generates a new access token using a refresh token.

#### Curl Request

```bash
curl -X POST https://api.loyahub.com/api/v1/auth/keycloak/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "c29tZSBzZWNyZXQ..."
  }'
```

**Example Response:**

```json
{
  "newAccessToken": "eyJhbGciOi..."
}
```

### 4. Register a New User

**POST** `/api/v1/user/register`  
Creates a new user account.

#### Curl Request

```bash
curl -X POST https://api.loyahub.com/api/v1/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "securepassword"
  }'
```

**Example Response:**

```json
{
  "message": "User registered successfully",
  "userId": 1
}
```

### 5. Update User Information

**PATCH** `/api/v1/user/update`  
Updates the details of an existing user.

#### Curl Request

```bash
curl -X PATCH https://api.loyahub.com/api/v1/user/update \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "name": "John Doe Updated"
  }'
```

**Example Response:**

```json
{
  "message": "User updated successfully"
}
```

### 6. Delete User

**DELETE** `/api/v1/user/delete`  
Deletes a user account.

#### Curl Request

```bash
curl -X DELETE https://api.loyahub.com/api/v1/user/delete \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1
  }'
```

**Example Response:**

```json
{
  "message": "User deleted successfully"
}
```

## Conclusion

The **Authentication and User** endpoints provide secure access to the Loyahub ecosystem, enabling user registration, authentication, and account management. These endpoints integrate with Keycloak to ensure secure and efficient access control.
