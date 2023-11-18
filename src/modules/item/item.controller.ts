import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpException,
	HttpStatus,
	UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { ItemService } from './item.service';
import { CriaItemDTO } from './dto/cria-item.dto';
import { AtualizaItemDTO } from './dto/atualiza-item.dto';

@UseGuards(AuthGuard)
@ApiTags('Item - Não finalizado')
@Controller('/item')
export class ItemController {
	constructor(private readonly itemService: ItemService) {}

	@Post()
	async criarItem(@Body() dadosEstado: CriaItemDTO) {
		try {
			const itemCriado = await this.itemService.criarItem(dadosEstado);

			return {
				mensagem: 'Item criado com sucesso!',
				dados: itemCriado,
			};
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	@Get()
	async buscaTodosItens() {
		try {
			const itens = await this.itemService.buscarTodosItens();

			return itens;
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	//Aplicando o metodo chamado "Trasnformaçao de Parametros" podemos passar o tipo de busca que queremos
	@Get('/:id')
	async buscarItensDoTenant(@Param('id') id: string) {
		try {
			const itens = await this.itemService.buscaItensPorTenant(id);

			return itens;
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@Patch('/:id')
	async atualizarEstado(
		@Param('id') id: string,
		@Body() dadosItem: AtualizaItemDTO,
	) {
		try {
			const itemAtualizado = await this.itemService.atualizarItem(
				id,
				dadosItem,
			);
			return {
				mensagem: 'Item autalizado com sucesso!',
				dados: itemAtualizado,
			};
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	@Delete('/:id')
	async deletarItem(@Param('id') id: string) {
		try {
			const estadoRemovido = await this.itemService.deletarItem(id);

			return {
				mensagem: 'Item deletado com sucesso!',
				dados: estadoRemovido,
			};
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}
}
