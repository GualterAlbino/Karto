import { Module } from '@nestjs/common';
import { CidadeService } from './cidade.service';
import { CidadeController } from './cidade.controller';
import { CidadeEntity } from './entities/cidade.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoModule } from '../estado/estado.module';

@Module({
	imports: [EstadoModule, TypeOrmModule.forFeature([CidadeEntity])],
	controllers: [CidadeController],
	providers: [CidadeService],
	exports: [CidadeService],
})
export class CidadeModule {}
