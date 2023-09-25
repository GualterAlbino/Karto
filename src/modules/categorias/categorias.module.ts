import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { CategoriaEntity } from './entities/categoria.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([CategoriaEntity])],
	controllers: [CategoriasController],
	providers: [CategoriasService],
})
export class CategoriasModule {}