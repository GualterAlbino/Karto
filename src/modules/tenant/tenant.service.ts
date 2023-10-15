import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TenantEntity } from './entities/tenant.entity';
import { Repository } from 'typeorm';
import { CriaTenantDTO } from './dto/cria-tenant.dto';
import { v4 as uuid } from 'uuid';
import { ListaTenantDTO } from './dto/lista-tenant.dto';
import { AtualizaTenantDTO } from './dto/atualiza-tenant.dto';

@Injectable()
export class TenantService {
	constructor(
		@InjectRepository(TenantEntity)
		private readonly tenantRepository: Repository<TenantEntity>,
	) {}

	async criarTenant(dadosDoUsuario: CriaTenantDTO) {
		try {
			const tenantEntity = new TenantEntity();

			tenantEntity.id = uuid(); //??
			tenantEntity.slug = dadosDoUsuario.slug;
			tenantEntity.nome = dadosDoUsuario.nome;
			tenantEntity.email = dadosDoUsuario.email;
			tenantEntity.senha = dadosDoUsuario.senha;
			tenantEntity.corPrincipal = dadosDoUsuario.corPrincipal;

			const checkEmail = await this.tenantRepository.findOne({
				where: { email: tenantEntity.email },
			});
			//Valida se o e-mail já está sendo utilizado
			if (checkEmail) {
				throw new ConflictException(
					`O e-mail ${tenantEntity.email} já está sendo utilizado.`,
				);
			}

			return this.tenantRepository.save(tenantEntity);
		} catch (error) {
			throw new ConflictException(error.message);
		}
	}

	async buscaTodosTenants() {
		try {
			const tenantsExistentes = await this.tenantRepository.find();

			const tenants = tenantsExistentes.map(
				(tenant) => new ListaTenantDTO(tenant.id, tenant.nome),
			);

			return tenants;
		} catch (error) {
			throw new ConflictException(error.message);
		}
	}

	async buscaTenantPorEmail(email: string) {
		try {
			const checkEmail = await this.tenantRepository.findOne({
				where: { email: email },
			});

			return checkEmail;
		} catch (error) {
			throw new ConflictException(error.message);
		}
	}

	async buscaTenantPorID(id: string) {
		try {
			const checkID = await this.tenantRepository.findOne({
				where: { id },
			});

			return checkID;
		} catch (error) {
			throw new ConflictException(error.message);
		}
	}

	async atualizarTenant(id: string, tenantEntity: AtualizaTenantDTO) {
		try {
			const tenantAtualizado = await this.tenantRepository.update(
				id,
				tenantEntity,
			);

			if (tenantAtualizado.affected === 0) {
				throw new NotFoundException(
					`O usuario não foi encontrado e não pôde ser atualizado.`,
				);
			}
		} catch (error) {
			throw new ConflictException(error.message);
		}
	}

	async deletarTenant(id: string) {
		try {
			const tenantDeletado = await this.tenantRepository.delete(id);

			if (tenantDeletado.affected === 0) {
				throw new ConflictException(
					`O tenant com o ID: " ${id} " não foi encontrado! Nenhum registro foi afetado.`,
				);
			}
		} catch (error) {
			throw new ConflictException(error.message);
		}
	}
}
