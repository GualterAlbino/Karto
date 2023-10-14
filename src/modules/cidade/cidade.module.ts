import { Module } from '@nestjs/common';
import { CidadeService } from './cidade.service';
import { CidadeController } from './cidade.controller';
import { CidadeEntity } from './entities/cidade.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CidadeEntity])],
  controllers: [CidadeController],
  providers: [CidadeService],
})
export class CidadeModule {
  
}
