import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpStatus,
	HttpException,
} from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CriaCategoriaDto } from './dto/cria-categoria.dto';
import { AtualizaCategoriaDto } from './dto/atualiza-categoria.dto';

@Controller('/categoria')
export class CategoriaController {
	constructor(private readonly categoriasService: CategoriaService) {}

	@Post()
	async criarCategoria(@Body() dadosCategoria: CriaCategoriaDto) {
		try {
			const categoriaCriada =
				await this.categoriasService.criarCategoria(dadosCategoria);

			return {
				mensagem: 'Categoria criada com sucesso!',
				dados: categoriaCriada,
			};
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	@Get()
	async buscaTodasCategorias() {
		try {
			const categorias = await this.categoriasService.buscaTodasCategorias();

			return categorias;
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	@Get('/:descricao')
	async buscaCategoriaPorNome(@Param('descricao') descricao: string) {
		try {
			const categoriaProcurada =
				await this.categoriasService.buscaCategoriaPorNome(descricao);

			if (!categoriaProcurada) {
				return {
					mensagem: 'Categoria não encontrada',
				};
			}

			return categoriaProcurada;
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	@Patch('/:descricao')
	async atualizarCategoria(
		@Param('descricao') descricao: string,
		@Body() dadosCategoria: AtualizaCategoriaDto,
	) {
		try {
			const categoriaAlterada = await this.categoriasService.atualizarCategoria(
				descricao,
				dadosCategoria,
			);
			return {
				mensagem: 'Categoria autalizada com sucesso!',
				dados: categoriaAlterada,
			};
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	@Delete('/:descricao')
	async deletarCategoria(@Param('descricao') descricao: string) {
		try {
			const categoriaDeletada =
				await this.categoriasService.deletarCategoria(descricao);
			return {
				mensagem: 'Categoria deletada com sucesso!',
				dados: categoriaDeletada,
			};
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}
}
