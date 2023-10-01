//Arquivo de configuração do NestJS
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist';
import 'dotenv/config';
import path from 'path';

@Injectable()
export class PostgresConfig implements TypeOrmOptionsFactory {
	//Executa o constructor com as config das variaveis de ambiente
	constructor(private config: ConfigService) {}

	createTypeOrmOptions(): TypeOrmModuleOptions {
		console.log(this.config.get<number>('DB_HOST'));
		return {
			type: 'postgres',
			host: this.config.get<string>('DB_HOST'),
			port: this.config.get<number>('DB_PORT'),
			username: this.config.get<string>('DB_USERNAME'),
			password: this.config.get<string>('DB_PASSWORD'),
			database: this.config.get<string>('DB_NAME'),

			entities: [__dirname + '/../**/*.entity{.js,.ts}'], //Importa TODOS os arquivos que tenham .entity {} para ser JS e TS

			synchronize: true, //Não deve ser utilizado - Substituir por Migrations
			//migrations: [__dirname + '//migrations//*.{js,ts}'],
		};
	}
}
