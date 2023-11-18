import { Module } from '@nestjs/common';
import { StatusTenantController } from './status.tenant.controller';
import { StatusTenantService } from './status.tenant.service';
import { StatusTenantEntity } from './entities/status.tenant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([StatusTenantEntity])],
	controllers: [StatusTenantController],
	providers: [StatusTenantService],
	exports: [StatusTenantService],
})
export class StatusTenantModule {}
