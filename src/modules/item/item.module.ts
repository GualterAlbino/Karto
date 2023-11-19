import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from './entities/item.entity';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { CategoriaModule } from '../categoria/categoria.module';
import { TenantModule } from '../tenant/tenant.module';

@Module({
	imports: [TypeOrmModule.forFeature([ItemEntity]), CategoriaModule, TenantModule],
	controllers: [ItemController],
	providers: [ItemService],
	exports: [ItemService],
})
export class ItemModule {}
