import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';

@Injectable()
export class MinioService {
	private readonly minioClient: Minio.Client;

	constructor() {
		this.minioClient = new Minio.Client({
			endPoint: 'http://127.0.0.1',
			port: 9001,
			useSSL: false,
			accessKey: 'Admin',
			secretKey: 'Astronalta@24',
		});
	}

	async uploadImage(buffer: Buffer, filename: string): Promise<Minio.UploadedObjectInfo> {
		const minioUrl = await this.minioClient.putObject('profile-images', filename, buffer, buffer.length);
		return minioUrl;
	}

	async getImageUrl(filename: string): Promise<string | null> {
		try {
			const minioUrl = await this.minioClient.presignedGetObject('profile-images', filename);
			return minioUrl;
		} catch (error) {
			return null;
		}
	}
}
