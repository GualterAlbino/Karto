import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CriaCidadeDto } from './dto/cria-cidade.dto';
import { AtualizaCidadeDto } from './dto/atualiza-cidade.dto';
import { v4 as uuid } from 'uuid';
import { ListaCidadeDTO } from './dto/lista-cidade.dto';
import { CidadeEntity } from './entities/cidade.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CidadeService {
	constructor(
		@InjectRepository(CidadeEntity)
		private readonly cidadeRepository: Repository<CidadeEntity>,
	) {}

	async criarCidade(dadosCidade: CriaCidadeDto) {
		try {
			const cidadeExistente = await this.cidadeRepository.findOne({
				where: { descricao: dadosCidade.descricao },
			});

			if (cidadeExistente) {
				throw new ConflictException(
					`Já existe uma cidade cadastrada com o nome ${dadosCidade.descricao}`,
				);
			}

			const cidadeEntity = new CidadeEntity();

			cidadeEntity.id = uuid();
			cidadeEntity.descricao = dadosCidade.descricao;
			cidadeEntity.valor_frete = dadosCidade.valorFrete;
			cidadeEntity.estado = dadosCidade.estado;

			return this.cidadeRepository.save(cidadeEntity);
		} catch (error) {
			throw new ConflictException(`${error.message}`);
		}
	}

	async buscaTodasCidades() {
		try {
			const cidadeExistentes = await this.cidadeRepository.find();

			const cidades = cidadeExistentes.map(
				(cidade) => new ListaCidadeDTO(cidade.id, cidade.descricao),
			);

			return cidades;
		} catch (error) {
			throw new ConflictException(`${error.message}`);
		}
	}

	async buscaCidadePorDescricao(descricao: string) {
		try {
			const checkDesc = await this.cidadeRepository.findOne({
				where: { descricao },
			});

			return checkDesc;
		} catch (error) {
			throw new ConflictException(`${error.message}`);
		}
	}

	async buscaCidadePorID(id: string) {
		try {
			const checkDesc = await this.cidadeRepository.findOne({
				where: { id },
			});

			return checkDesc;
		} catch (error) {
			throw new ConflictException(`${error.message}`);
		}
	}

	async atualizarCidade(descricao: string, cidadeEntity: AtualizaCidadeDto) {
		try {
			const ciadeAtualizada = await this.cidadeRepository.update(
				{ descricao: descricao },
				cidadeEntity,
			);

			if (ciadeAtualizada.affected === 0) {
				throw new NotFoundException(
					`A Cidade: " ${descricao} " não foi encontrado! Nenhum registro foi afetado.`,
				);
			}
		} catch (error) {
			throw new ConflictException(error.message);
		}
	}

	async deletarCidade(id: string) {
		try {
			const resultadoDelecao = await this.cidadeRepository.delete({ id: id });
			if (resultadoDelecao.affected === 0) {
				// Nenhum registro foi excluído, o estado não foi encontrado
				throw new NotFoundException(
					`Nenhuma cidade encontrada! Nenhum registro fou afetado.`,
				);
			}
		} catch (error) {
			throw new ConflictException(error.message);
		}
	}
}
