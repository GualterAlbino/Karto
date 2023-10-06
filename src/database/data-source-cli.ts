//Arquivo de configuração do TypeORM
import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,

	entities: [__dirname + '\\..\\**\\*.entity{.js,.ts}'], //Identifica esse pdrão de arquivo e importa automaticamente
	migrations: [__dirname + '//migrations//*.{js,ts}'],

	synchronize: true//, - Não deve ser utilizado - Substituir por Migrations
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
