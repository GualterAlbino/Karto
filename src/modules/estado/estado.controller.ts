import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { EstadoService } from './estado.service';
import { CriaEstadoDto } from './dto/cria-estado.dto';
import { AtualizaEstadoDto } from './dto/atualiza-estado.dto';
import { ListaEstadoDTO } from './dto/lista-estado.dto';

@Controller('/estado')
export class EstadoController {
	constructor(private readonly estadoService: EstadoService) {}

	@Post()
	async criarEstado(@Body() dadosEstado: CriaEstadoDto) {
		const estadoCriado =
			await this.estadoService.criarEstado(dadosEstado);
		
		return {
			mensagem: 'Estado criado com sucesso!',
			dados: estadoCriado,
		};
	}	

	@Get()
	async buscaTodosEstados() {
		const estados = await this.estadoService.buscaTodosEstados();

		return estados;
	}

	@Get('/:descricao')
	async buscaEstadoPorDesc(@Param('descricao') descricao: string){
		const estadoProcurado = await this.estadoService.buscaEstadoPorDesc;

		if(estadoProcurado == null) {
			return {
				mensagem: 'Estado não encontrado',
			};
		}
	}

	@Get('/:id')
	async buscaEstadoPorId(@Param('id') id: string){
		const estadoProcurado = await this.estadoService.buscaEstadoPorID(id);

		if(estadoProcurado == null) {
			return {
				mensagem: 'Estado não encontrado',
			};
		}
	}

	@Get('/:uf')
	async buscaEstadoPorUf(@Param('uf') uf: string){
		const estadoProcurado = await this.estadoService.buscaEstadoPorUF(uf);

		if(estadoProcurado == null) {
			return {
				mensagem: 'Estado não encontrado',
			};
		}
	}

	@Patch('/:id')
	async atualizarEstado(
		@Param('id') id:string, 
		@Body() dadosEstado: AtualizaEstadoDto,
	){
		const estadoAlterado = await this.estadoService.atualizarEstado(
			id,
			dadosEstado 
			);	
		return {
			mensagem: 'Estado autalizado com sucesso!',
			dados: estadoAlterado,
		};
	}

	@Delete('/:id')
	async deletarEstado(@Param('id') id: string)
	{
		const estadoRemovido = await this.estadoService.deletarEstado(id);
		return {
			mensagem: 'Estado deletado com sucesso!',
			dados: estadoRemovido,
		};
	}


}
