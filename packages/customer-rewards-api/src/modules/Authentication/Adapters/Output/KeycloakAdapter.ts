import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { Redis } from 'ioredis';
import axios from 'axios';
import { DependencyInjectionTokens } from '../../../../helper/AppConstants';
import { KeycloakLoginDTO } from '../../Domain/DTO/HTTPRequest/AuthenticationRequest';
import { KeycloakTokenOutputPort } from '../../Port/Output/AuthenticationKeycloakTokenOutputPort';

@Injectable()
export class KeycloakAuthAdapter implements KeycloakTokenOutputPort {
	constructor(@Inject(DependencyInjectionTokens.REDIS_CLIENT) private readonly redisClient: Redis) {}

	// LOGIN
	async login(loginDTO: KeycloakLoginDTO): Promise<{ access_token: string; refresh_token?: string }> {
		const { username, password } = loginDTO;

		try {
			const params = new URLSearchParams();
			params.append('grant_type', 'password');
			params.append('client_id', process.env.KEYCLOAK_CLIENT_ID);
			params.append('client_secret', process.env.KEYCLOAK_CLIENT_SECRET);
			params.append('username', username);
			params.append('password', password);
			params.append('scope', 'openid offline_access');

			const response = await axios.post(process.env.KEYCLOAK_TOKEN_URL, params.toString(), {
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			});

			const { access_token, refresh_token } = response.data;

			// Armazena no Redis usando o username como chave
			await this.redisClient.set(
				`user:${username}`,
				JSON.stringify({ access_token, refresh_token }),
				'EX',
				3600, // Expira em 1 hora
			);

			return { access_token, refresh_token };
		} catch (error) {
			console.error(error?.response?.data || error.message);
			throw new UnauthorizedException('Invalid Keycloak credentials');
		}
	}

	// LOGOUT
	async logout(username: string): Promise<void> {
		try {
			// Tenta buscar o usuário pelo username no Redis
			const userData = await this.redisClient.get(`user:${username}`);
			if (!userData) {
				console.warn(`No active session found for user: ${username}`);
				return;
			}

			// Extrai o refresh token do dado armazenado
			const { refresh_token } = JSON.parse(userData);

			// Realiza o logout no Keycloak
			const params = new URLSearchParams({
				client_id: process.env.KEYCLOAK_CLIENT_ID,
				client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
				refresh_token: refresh_token,
			});

			const response = await axios.post(process.env.KEYCLOAK_LOGOUT_URL, params.toString(), {
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			});

			if (response.status !== 204) {
				console.error(`Keycloak logout failed: ${response.data}`);
				throw new Error('Keycloak logout failed');
			}

			// Remove todas as chaves associadas ao usuário
			const deleted = await this.redisClient.del(`user:${username}`);
			if (deleted) {
				console.log(`Deleted session for user: ${username}`);
			} else {
				console.warn(`No Redis entry found for user: ${username}`);
			}
		} catch (error) {
			console.error(error?.response?.data || error.message);
			throw new Error('Logout failed');
		}
	}

	// REFRESH
	async refresh(username: string): Promise<{ access_token: string; refresh_token?: string }> {
		try {
			const userData = await this.redisClient.get(`user:${username}`);
			if (!userData) {
				throw new UnauthorizedException('No active session found for user');
			}

			const { refresh_token } = JSON.parse(userData);

			if (!refresh_token) {
				throw new UnauthorizedException('No refresh token available');
			}

			const params = new URLSearchParams({
				grant_type: 'refresh_token',
				client_id: process.env.KEYCLOAK_CLIENT_ID,
				client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
				refresh_token: refresh_token,
			});

			const response = await axios.post(process.env.KEYCLOAK_TOKEN_URL, params.toString(), {
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			});

			const { access_token, refresh_token: newRefreshToken } = response.data;

			// Atualiza o Redis com o novo refresh token
			await this.redisClient.set(
				`user:${username}`,
				JSON.stringify({ access_token, refresh_token: newRefreshToken }),
				'EX',
				3600, // Expira em 1 hora
			);

			return { access_token, refresh_token: newRefreshToken };
		} catch (error) {
			console.error('Refresh token failed:', error.response?.data || error.message);
			throw new UnauthorizedException('Token refresh failed');
		}
	}

	// Valida Usuário
	async validateUser(payload: any): Promise<any> {
		const cachedUser = await this.redisClient.get(`user:${payload.username}`);

		if (cachedUser) {
			return JSON.parse(cachedUser);
		}

		throw new Error('User not found or session expired');
	}

	// Função auxiliar para extrair o username do token JWT
	private extractUsernameFromToken(token: string): string {
		try {
			const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
			return payload.preferred_username;
		} catch (error) {
			throw new Error('Failed to extract username from token');
		}
	}
}
