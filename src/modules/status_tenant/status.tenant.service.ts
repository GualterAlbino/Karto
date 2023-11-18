import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CriaStatusTenantDTO } from './dto/cria-status-tenant.dto';
import { StatusTenantEntity } from './entities/status.tenant.entity';
import { ListaStatusTenantDTO } from './dto/lista-status-tenant.dto';

@Injectable()
export class StatusTenantService {
	constructor(
		@InjectRepository(StatusTenantEntity)
		private readonly statusTenantRepository: Repository<StatusTenantEntity>,
	) {}

	async criarStatusTenant(dadosDoStatus: CriaStatusTenantDTO) {
		try {
			const statusTenantEntity = new StatusTenantEntity();

			statusTenantEntity.id = uuid(); //??
			statusTenantEntity.descricao = dadosDoStatus.descricao;

			const checkEmail = await this.statusTenantRepository.findOne({
				where: { descricao: statusTenantEntity.descricao },
			});
			//Valida se a descrição já está sendo utilizada
			if (checkEmail) {
				throw new ConflictException(
					`A descrição ${statusTenantEntity.descricao} já está sendo utilizada.`,
				);
			}

			return this.statusTenantRepository.save(statusTenantEntity);
		} catch (error) {
			throw new ConflictException(error.message);
		}
	}

	async buscaTodosStatusTenants() {
		try {
			const tenantsExistentes = await this.statusTenantRepository.find();

			const statusTenant = tenantsExistentes.map(
				(status) => new ListaStatusTenantDTO(status.descricao),
			);

			return statusTenant;
		} catch (error) {
			throw new ConflictException(error.message);
		}
	}
}
