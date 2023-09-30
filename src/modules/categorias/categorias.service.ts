import { Injectable } from '@nestjs/common';
import { CriaCategoriaDto } from './dto/cria-categoria.dto';
import { AtualizaCategoriaDto } from './dto/atualiza-categoria.dto';
import { ListaCategoriaDTO } from './dto/lista-categoria.dto';
import { CategoriaEntity } from './entities/categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';



@Injectable()
export class CategoriasService {
	constructor(
		@InjectRepository (CategoriaEntity)
		private readonly categoriasRepository: Repository<CategoriaEntity>,
	) {}
	
	async criarCategoria(dadosCategoria: 
	CriaCategoriaDto) {
		const categoriaEntity = new CategoriaEntity();

		categoriaEntity.id = uuid(); //??
		categoriaEntity.nome = dadosCategoria.nome;

		return this.categoriasRepository.save(categoriaEntity);
	}
	
	async buscaTodasCategorias() {
		const categoriaExistentes =  await this.categoriasRepository.find();

		const categorias = categoriaExistentes.map(
			(categoria) => new ListaCategoriaDTO(categoria.id, categoria.nome),
		);
		
		return categorias;
	}
	
	async buscaCategoriaPorNome(nome: string){
		const checkNome = await this.categoriasRepository.findOne({
			where:{ nome },
		})

		return checkNome;
	}

	async buscaCategoriaPorId(id: string){
		const checkID = await this.categoriasRepository.findOne({
			where:{ id },
		})

		return checkID;
	}

	async atualizarCategoria(id: string, categoriaEntity: AtualizaCategoriaDto) {
		await this.categoriasRepository.update(id, categoriaEntity);
	}

	async deletarCategoria(id: string){
		await this.categoriasRepository.delete(id);
	}

}
