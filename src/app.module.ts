import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfig } from './config/postgres.config';
import { UsuarioModule } from '../src/modules/usuario/usuario.module';
import { APP_FILTER } from '@nestjs/core';
import { FiltroDeExcecaoHttp } from './middlewares/filtro-de-excecao-http';

@Module({
	imports: [
		ConfigModule.forRoot(
			//Importa o módulo de configuração
			{ isGlobal: true }, //Define que as configurações são globais
		),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfig, //Aponta a classe de config
      inject: [PostgresConfig] ////Injeta a classe de config
    }),
    UsuarioModule
	],
	providers: [{ provide: APP_FILTER, useClass: FiltroDeExcecaoHttp }],
	
})
export class AppModule {}
