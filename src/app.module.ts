import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { PostgresConfig } from './database/postgres.config';
import { FiltroDeExcecaoHttp } from './middlewares/FiltroDeExcecaoHttp';
import { UsuarioModule } from './modules/usuario/usuario.module';

@Module({
	imports: [
		ConfigModule.forRoot(
			//Importa o módulo de configuração
			{ isGlobal: true }, //Define que as configurações são globais
		),
		TypeOrmModule.forRootAsync({
			useClass: PostgresConfig,
			inject: [PostgresConfig],
		}),

		UsuarioModule,
	],
	providers: [{ provide: APP_FILTER, useClass: FiltroDeExcecaoHttp }],
})
export class AppModule {}
