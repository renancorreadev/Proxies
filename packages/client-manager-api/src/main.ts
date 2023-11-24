import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
import { AppModule } from './app.module';
import { BaseUrls } from './helper/AppConstants';
config();

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ['error', 'log'],
	});

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
		}),
	);

	app.setGlobalPrefix(BaseUrls.API_BASE_URL);

	const config = new DocumentBuilder()
		.setTitle('CustomerManagementCore Api')
		.setDescription(
			'O ClientManagerAPI , é uma plataforma digital de serviços que facilita a sua gestão de clientes pela tecnologia de Blockchain, com a tecnologia de blockchain todos dados são imutaveis e transparentes. ',
		)
		.setVersion('1.0.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(process.env.PORT);
}
bootstrap();
