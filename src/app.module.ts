import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { PostgresConfig } from './database/postgres.config';
import { FiltroDeExcecaoHttp } from './middlewares/FiltroDeExcecaoHttp';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { EstadoModule } from './modules/estado/estado.module';
import { CidadeModule } from './modules/cidade/cidade.module';
import { AuthModule } from './modules/auth/auth.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { StatusTenantModule } from './modules/status_tenant/status.tenant.module';

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
		CategoriaModule,
		EstadoModule,
		CidadeModule,
		AuthModule,
		TenantModule,
		StatusTenantModule,
	],
	providers: [{ provide: APP_FILTER, useClass: FiltroDeExcecaoHttp }],
})
export class AppModule {}
