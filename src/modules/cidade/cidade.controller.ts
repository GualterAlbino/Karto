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
	UseGuards,
} from '@nestjs/common';
import { CidadeService } from './cidade.service';
import { CriaCidadeDto } from './dto/cria-cidade.dto';
import { AtualizaCidadeDto } from './dto/atualiza-cidade.dto';
import { ListaCidadeDTO } from './dto/lista-cidade.dto';
import { CidadeEntity } from './entities/cidade.entity';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { EstadoService } from '../estado/estado.service';

@UseGuards(AuthGuard)
@ApiTags('Cidade')
@Controller('/cidade')
export class CidadeController {
	constructor(
		private readonly cidadeService: CidadeService,
		private readonly estadoService: EstadoService,
	) {}

	@Post()
	async criarCidade(@Body() dadosCidade: CriaCidadeDto) {
		try {
			const checkEstado = await this.estadoService.buscaEstadoPorUF(dadosCidade.estado.uf)

			if (!checkEstado) {
				return {
					mensagem: 'Estado informado para cidade não existe na base de dados!',
				};
			}

			const cidadeCriada = await this.cidadeService.criarCidade(dadosCidade);

			return {
				mensagem: 'Cidade criada com sucesso!',
				dados: cidadeCriada,
			};
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	@Get()
	async buscaTodasCidades() {
		try {
			const cidades = await this.cidadeService.buscaTodasCidades();

			return cidades;
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	//Aplicando o metodo chamado "Trasnformaçao de Parametros" podemos passar o tipo de busca que queremos
	@Get('/:tipo/:valor')
	async buscar(@Param('tipo') tipo: string, @Param('valor') valor: string) {
		try {
			let cidadeProcurada: CidadeEntity;

			if (tipo === 'id') {
				cidadeProcurada = await this.cidadeService.buscaCidadePorID(valor);
			} else if (tipo === 'descricao') {
				cidadeProcurada =
					await this.cidadeService.buscaCidadePorDescricao(valor);
			} else {
				return {
					mensagem:
						'Tipo de busca inválido! \n Os tipos aceitos são: id, descricao.',
				};
			}

			if (!cidadeProcurada) {
				return {
					mensagem: 'Cidade não encontrado!',
				};
			} else {
				return cidadeProcurada;
			}
		} catch (error) {
			throw new HttpException(error, HttpStatus.BAD_REQUEST);
		}
	}

	@Patch('/:id')
	async atualizarCidade(
		@Param('id') id: string,
		@Body() dadosCidade: AtualizaCidadeDto,
	) {
		try {
			const cidadeAlterada = await this.cidadeService.atualizarCidade(
				id,
				dadosCidade,
			);
			return {
				mensagem: 'Ciadade autalizada com sucesso!',
				dados: cidadeAlterada,
			};
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	@Delete('/:id')
	async deletarEstado(@Param('id') id: string) {
		try {
			const cidadeRemovida = await this.cidadeService.deletarCidade(id);

			return {
				mensagem: 'Cidade deletada com sucesso!',
				dados: cidadeRemovida,
			};
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}
}
