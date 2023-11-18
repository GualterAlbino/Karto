import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoEntity } from './entities/estado.entity';
import { CriaEstadoDto } from './dto/cria-estado.dto';
import { v4 as uuid } from 'uuid';
import { ListaEstadoDTO } from './dto/lista-estado.dto';
import { AtualizaEstadoDto } from './dto/atualiza-estado.dto';

@Injectable()
export class EstadoService {
	constructor(
		@InjectRepository(EstadoEntity)
		private readonly estadoRepository: Repository<EstadoEntity>,
	) {}

	async criarEstado(dadosEstado: CriaEstadoDto) {
		try {
			const estadoExistente = await this.estadoRepository.findOne({
				where: { uf: dadosEstado.uf },
			});

			if (estadoExistente) {
				throw new ConflictException(
					`O estado com a UF: ${dadosEstado.uf} já existe.`,
				);
			}

			const estadoEntity = new EstadoEntity();

			estadoEntity.uf = dadosEstado.uf;
			estadoEntity.descricao = dadosEstado.descricao;

			return this.estadoRepository.save(estadoEntity);
		} catch (error) {
			throw new ConflictException(`${error.message}`);
		}
	}

	async buscaTodosEstados() {
		try {
			const estadoExistentes = await this.estadoRepository.find();

			const estados = estadoExistentes.map(
				(estado) => new ListaEstadoDTO(estado.uf, estado.descricao)
			);

			return estados;
		} catch (error) {
			throw new ConflictException(`${error.message}`);
		}
	}

	async buscaEstadoPorDescricao(descricao: string) {
		try {
			const checkDesc = await this.estadoRepository.findOne({
				where: { descricao },
			});

			return checkDesc;
		} catch (error) {
			throw new ConflictException(`${error.message}`);
		}
	}

	async buscaEstadoPorUF(uf: string) {
		try {
			const checkUF = await this.estadoRepository.findOne({
				where: { uf },
			});

			return checkUF;
		} catch (error) {
			throw new ConflictException(error.message);
		}
	}

	async atualizarEstado(uf: string, estadoEntity: AtualizaEstadoDto) {
		try {
			const estadoAtualizado = await this.estadoRepository.update(
				{ uf: uf },
				estadoEntity,
			);

			if (estadoAtualizado.affected === 0) {
				throw new NotFoundException(
					`O estado com a UF: " ${uf} " não foi encontrado! Nenhum registro foi afetado.`,
				);
			}
		} catch (error) {
			throw new ConflictException(error.message);
		}
	}

	async deletarEstado(uf: string) {
		try {
			const resultadoDelecao = await this.estadoRepository.delete({ uf: uf });
			if (resultadoDelecao.affected === 0) {
				// Nenhum registro foi excluído, o estado não foi encontrado
				throw new NotFoundException(
					`O estado com a UF: " ${uf} " não foi encontrado! Nenhum registro foi afetado.`,
				);
			}
		} catch (error) {
			throw new ConflictException(error.message);
		}
	}
}
