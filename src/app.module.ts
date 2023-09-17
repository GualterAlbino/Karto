import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfig } from './config/postgres.config';

@Module({
	imports: [
		ConfigModule.forRoot(
			//Importa o módulo de configuração
			{ isGlobal: true }, //Define que as configurações são globais
		),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfig, //Aponta a classe de config
      inject: [PostgresConfig] ////Injeta a classe de config
    })
	],
	
})
export class AppModule {}
