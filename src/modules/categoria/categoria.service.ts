import { ConflictException, Injectable } from '@nestjs/common';
import { CriaCategoriaDto } from './dto/cria-categoria.dto';
import { AtualizaCategoriaDto } from './dto/atualiza-categoria.dto';
import { ListaCategoriaDTO } from './dto/lista-categoria.dto';
import { CategoriaEntity } from './entities/categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CategoriaService {
	constructor(
		@InjectRepository(CategoriaEntity)
		private readonly categoriasRepository: Repository<CategoriaEntity>,
	) {}

	async criarCategoria(dadosCategoria: CriaCategoriaDto) {
		try {
			const categoriaExistente = await this.categoriasRepository.findOne({
				where: { descricao: dadosCategoria.descricao },
			});

			if (categoriaExistente) {
				throw new ConflictException(
					`A categoria com a descrição: ${dadosCategoria.descricao} já existe.`,
				);
			}

			const categoriaEntity = new CategoriaEntity();

			categoriaEntity.id = uuid(); //??
			categoriaEntity.descricao = dadosCategoria.descricao;

			return this.categoriasRepository.save(categoriaEntity);
		} catch (error) {
			throw new ConflictException(error.message);
		}
	}

	async buscaTodasCategorias() {
		try {
			const categoriaExistentes = await this.categoriasRepository.find();

			const categorias = categoriaExistentes.map(
				(categoria) => new ListaCategoriaDTO(categoria.id, categoria.descricao),
			);

			return categorias;
		} catch (error) {
			throw new ConflictException(error.message);
		}
	}

	async buscaCategoriaPorDescricao(descricao: string) {
		try {
			const checkNome = await this.categoriasRepository.findOne({
				where: { descricao },
			});

			return checkNome;
		} catch (error) {
			throw new ConflictException(error.message);
		}
	}

	async buscaCategoriaPorId(id: string) {
		try {
			const checkID = await this.categoriasRepository.findOne({
				where: { id },
			});

			return checkID;
		} catch (error) {
			throw new ConflictException(error.message);
		}
	}

	async atualizarCategoria(
		descricao: string,
		categoriaEntity: AtualizaCategoriaDto,
	) {
		try {
			const categoriaAlterada = await this.categoriasRepository.update(
				{ descricao: descricao },
				categoriaEntity,
			);

			if (categoriaAlterada.affected === 0) {
				throw new ConflictException(
					`A categoria com a descrição: " ${descricao} " não foi encontrada! Nenhum registro foi afetado.`,
				);
			}
		} catch (error) {
			throw new ConflictException(error.message);
		}
	}

	async deletarCategoria(descricao: string) {
		try {
			const categoriaDeletada = await this.categoriasRepository.delete({descricao: descricao});

			if (categoriaDeletada.affected === 0) {
				throw new ConflictException(
					`A categoria com a descrição: " ${descricao} " não foi encontrada! Nenhum registro foi afetado.`,
				);
			}
		} catch (error) {
			throw new ConflictException(error.message);
		}
	}
}
