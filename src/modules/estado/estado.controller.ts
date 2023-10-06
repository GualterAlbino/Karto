import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Logger,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { EstadoService } from './estado.service';
import { CriaEstadoDto } from './dto/cria-estado.dto';
import { AtualizaEstadoDto } from './dto/atualiza-estado.dto';
import { EstadoEntity } from './entities/estado.entity';

@Controller('/estado')
export class EstadoController {
	constructor(private readonly estadoService: EstadoService) {}

	@Post()
	async criarEstado(@Body() dadosEstado: CriaEstadoDto) {
		try {
			const estadoCriado = await this.estadoService.criarEstado(dadosEstado);

			return {
				mensagem: 'Estado criado com sucesso!',
				dados: estadoCriado,
			};
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	@Get()
	async buscaTodosEstados() {
		try {
			const estados = await this.estadoService.buscaTodosEstados();

			return estados;
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	//Aplicando o metodo chamado "Trasnformaçao de Parametros" podemos passar o tipo de busca que queremos
	@Get('/:tipo/:valor')
	async buscar(@Param('tipo') tipo: string, @Param('valor') valor: string) {
		try {
			let estadoProcurado: EstadoEntity;

			if (tipo === 'id') {
				estadoProcurado = await this.estadoService.buscaEstadoPorID(valor);
			} else if (tipo === 'uf') {
				estadoProcurado = await this.estadoService.buscaEstadoPorUF(valor);
			} else if (tipo === 'descricao') {
				estadoProcurado =
					await this.estadoService.buscaEstadoPorDescricao(valor);
			} else {
				return {
					mensagem:
						'Tipo de busca inválido! \n Os tipos aceitos são: id, uf, descricao.',
				};
			}

			if (!estadoProcurado) {
				return {
					mensagem: 'Estado não encontrado!',
				};
			} else {
				return estadoProcurado;
			}
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@Patch('/:uf')
	async atualizarEstado(
		@Param('uf') uf: string,
		@Body() dadosEstado: AtualizaEstadoDto,
	) {
		try {
			const estadoAlterado = await this.estadoService.atualizarEstado(
				uf,
				dadosEstado,
			);
			return {
				mensagem: 'Estado autalizado com sucesso!',
				dados: estadoAlterado,
			};
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	@Delete('/:uf')
	async deletarEstado(@Param('uf') uf: string) {
		try {
			const estadoRemovido = await this.estadoService.deletarEstado(uf);

			return {
				mensagem: 'Estado deletado com sucesso!',
				dados: estadoRemovido,
			};
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}
}
