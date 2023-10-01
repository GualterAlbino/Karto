import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CriaCategoriaDto } from './dto/cria-categoria.dto';
import { AtualizaCategoriaDto } from './dto/atualiza-categoria.dto';

@Controller('/categoria')
export class CategoriasController {
	constructor(private readonly categoriasService: CategoriasService) {}

	@Post()
	async criarCategoria(@Body() dadosCategoria: CriaCategoriaDto) {
		const categoriaCriada =
			await this.categoriasService.criarCategoria(dadosCategoria);
		
		return {
			mensagem: 'Categoria criada com sucesso!',
			dados: categoriaCriada,
		};
	}

	@Get()
	async buscaTodasCategorias() {
		const categorias = await this.categoriasService.buscaTodasCategorias();

		return categorias;
	}

	@Get('/:nome')
	async buscaCategoriaPorNome(@Param('nome') nome: string){
		const categoriaProcurada = await this.categoriasService.buscaCategoriaPorNome(nome);

		if(categoriaProcurada == null) {
			return {
				mensagem: 'Categoria não encontrada',
			};
		}
	}

	@Get('/:id')
	async buscaCategoriaPorID(@Param('id') id: string){
		const categoriaProcurada = await this.categoriasService.buscaCategoriaPorId(id);

		if(categoriaProcurada == null) {
			return {
				mensagem: 'Categoria não encontrada',
			};
		}
	}


	@Patch('/:id')
	async atualizarCategoria(
		@Param('id') id:string, 
		@Body() dadosCategoria: AtualizaCategoriaDto,
	){
		const categoriaAlterada = await this.categoriasService.atualizarCategoria(
			id,
			dadosCategoria 
			);	
		return {
			mensagem: 'Categoria autalizada com sucesso!',
			dados: categoriaAlterada,
		};
	}

	@Delete('/:id')
	async deletarCategoria(@Param('id') id: string)
	{
		const categoriaRemovida = await this.categoriasService.deletarCategoria(id);
		return {
			mensagem: 'Categoria deletada com sucesso!',
			dados: categoriaRemovida,
		};
	}

}
