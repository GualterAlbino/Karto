import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ItemEntity } from './entities/item.entity';
import { CriaItemDTO } from './dto/cria-item.dto';
import { ListaItemDTO } from './dto/lista-item.dto';
import { AtualizaItemDTO } from './dto/atualiza-item.dto';
import { TenantEntity } from '../tenant/entities/tenant.entity';
import { CategoriaEntity } from '../categoria/entities/categoria.entity';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Injectable()
export class ItemService {
	constructor(
		@InjectRepository(ItemEntity)
		private readonly itemRepository: Repository<ItemEntity>,
	) {}

	async criarItem(dadositem: CriaItemDTO) {
		try {
			const itemExistente = await this.itemRepository.findOne({
				where: { nome: dadositem.nome },
			});

			if (itemExistente) {
				throw new ConflictException(
					`Já existe um item com o nome: "${dadositem.nome}"`,
				);
			}

			const itemEntity = new ItemEntity();
			itemEntity.id = uuid();
			itemEntity.nome = dadositem.nome;
			itemEntity.descricao = dadositem.descricao;
			itemEntity.imagem = dadositem.imagem;
			itemEntity.valor = dadositem.valor;
			itemEntity.tenant = { id: dadositem.tenantId } as TenantEntity;
			itemEntity.categoria = { id: dadositem.categoriaId } as CategoriaEntity;

			return this.itemRepository.save(itemEntity);
		} catch (error) {
			throw new ConflictException(`${error.message}`);
		}
	}

	async buscarTodosItens() {
		try {
			const itensExistentes = await this.itemRepository.find({
				relations: ['tenant', 'categoria'],
			});

			console.log(itensExistentes);
			const itens = itensExistentes.map(
				(item) =>
					new ListaItemDTO(
						item.nome,
						item.descricao,
						item.imagem,
						item.valor,
						item.tenant.id,
						item.categoria.id,
					),
			);

			return itens;
		} catch (error) {
			throw new ConflictException(`${error.message}`);
		}
	}

	async buscaItensPorTenant(tenantId: string) {
		try {
			const checkTenant = await this.itemRepository.findOne({
				relations: ['categoria'],
				where: { tenant: { id: tenantId } },
			});
			return checkTenant;
		} catch (error) {
			throw new ConflictException(`${error.message}`);
		}
	}

	async atualizarItem(id: string, itemEntity: AtualizaItemDTO) {
		try {
		
			const itemAtualizado = await this.itemRepository.update(
				{ id },
				{
					nome: itemEntity.nome,
					descricao: itemEntity.descricao,
					imagem: itemEntity.imagem,
					valor: itemEntity.valor,
					tenant: { id: itemEntity.tenantId },
					categoria: { id: itemEntity.categoriaId },
				},
			);

			if (itemAtualizado.affected === 0) {
				throw new NotFoundException(
					`O Item: "${itemEntity.nome}" não foi encontrado! Nenhum registro foi afetado.`,
				);
			}
		} catch (error) {
			throw new ConflictException(error.message);
		}
	}

	async deletarItem(id: string) {
		try {
			const resultadoDelecao = await this.itemRepository.delete({ id });
			if (resultadoDelecao.affected === 0) {
				// Nenhum registro foi excluído, o estado não foi encontrado
				throw new NotFoundException(
					`O iem com o ID: " ${id} " não foi encontrado! Nenhum registro foi afetado.`,
				);
			}
		} catch (error) {
			throw new ConflictException(error.message);
		}
	}
}
