import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfig } from './config/postgres.config';
import { APP_FILTER } from '@nestjs/core';
import { FiltroDeExcecaoHttp } from './middlewares/FiltroDeExcecaoHttp';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { EstadoModule } from './modules/estado/estado.module';

@Module({
	imports: [
		ConfigModule.forRoot(
			//Importa o módulo de configuração
			{ isGlobal: true }, //Define que as configurações são globais
		),
		TypeOrmModule.forRootAsync({
			useClass: PostgresConfig, //Aponta a classe de config
			inject: [PostgresConfig], ////Injeta a classe de config
		}),
		UsuarioModule,
		CategoriasModule,
		EstadoModule,
	],
	providers: [{ provide: APP_FILTER, useClass: FiltroDeExcecaoHttp }],
})
export class AppModule {}
