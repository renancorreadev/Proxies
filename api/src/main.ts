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

	//app.setGlobalPrefix('api/elo/v1');

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
		.setTitle('WHIZZ')
		.setDescription(
			'O Whizz, é uma plataforma digital de serviços que facilita a inserção da Instituição Financeira na economia tokenizada ofertando catálogo de produtos para gestão de chaves, execução de Smart Contracts e interoperabilidade entre redes. \n - O Whizz simplifica o desenvolvimento da infraestrutura das instituições para agilizar a inserção em nova economia tokenizada, com segurança e credibilidade, diferentemente da própria Institução Financeira desenvolver uma solução internamente.',
		)
		.setVersion('1.0.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(process.env.PORT);
}
bootstrap();
