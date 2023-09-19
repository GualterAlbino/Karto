import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	//Validação de Dados
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true, //Trasnforma os dados em objetos (JSON)
			whitelist: true, //Remove(IGNORA) os campos que não estão no DTO
			forbidNonWhitelisted: true, //Retorna um erro caso o DTO tenha campos que não estão no DTO
		}),
	);

	useContainer(app.select(AppModule), { fallbackOnErrors: true }); //Ao fazer isso, o ClassValidator resolverá as dependências de forma automática (Assim como o NestJS faz), Se não conseguir resolver, ele retornará um erro

	await app.listen(3000);
}
bootstrap();
