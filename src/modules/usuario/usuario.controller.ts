import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Put,
	HttpException,
	HttpStatus,
	Patch,
	UseGuards,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CriaUsuarioDTO } from './dto/cria-usuario.dto';
import { AtualizaUsuarioDTO } from './dto/atualiza-usuario.dto';
import { HashearSenhaPipe } from 'src/resources/pipes/hashear-senha.pipe';
import { ListaUsuarioDTO } from './dto/lista-usuario.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('/usuario')
export class UsuarioController {
	constructor(private readonly usuarioService: UsuarioService) {}

	@Post()
	async criarUsuario(
		@Body() { senha, ...dadosDoUsuario }: CriaUsuarioDTO, //Descarto a senha sem o HASH
		@Body('senha', HashearSenhaPipe) senhaHasheada: string, //Aplicação do HASH de senha
	) {
		try {
			//Utilizo a senha com o HASH ao armazenar no banco
			const usuarioCriado = await this.usuarioService.criarUsuario({
				...dadosDoUsuario,
				senha: senhaHasheada,
			});

			return {
				mensagem: 'Usuario criado com sucesso!',
				dados: new ListaUsuarioDTO(usuarioCriado.id, usuarioCriado.nome),
			};
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}
	@UseGuards(AuthGuard)
	@Get()
	async buscaTodosUsuarios() {
		try {
			const usuarios = await this.usuarioService.buscaTodosUsuarios();

			return usuarios;
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	@UseGuards(AuthGuard)
	@Get('/:id')
	async buscaUsuarioPorEmail(@Param('email') email: string) {
		try {
			const usuarioProcurado =
				await this.usuarioService.buscaUsuarioPorEmail(email);

			if (usuarioProcurado == null) {
				return {
					mensagem: 'Usuario não encontrado!',
				};
			}

			return {
				dados: new ListaUsuarioDTO(usuarioProcurado.id, usuarioProcurado.nome),
			};
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	@UseGuards(AuthGuard)
	@Get('/:id')
	async buscaUsuarioPorID(@Param('id') id: string) {
		try {
			const usuarioProcurado = await this.usuarioService.buscaUsuarioPorID(id);

			if (usuarioProcurado == null) {
				return {
					mensagem: 'Usuario não encontrado!',
				};
			}
			return {
				dados: new ListaUsuarioDTO(usuarioProcurado.id, usuarioProcurado.nome),
			};
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	@UseGuards(AuthGuard)
	@Patch('/:id')
	async atualizarUsuario(
		@Param('id') id: string,
		@Body() dadosDoUsuario: AtualizaUsuarioDTO,
	) {
		try {
			const usuarioAlterado = await this.usuarioService.atualizarUsuario(
				id,
				dadosDoUsuario,
			);
			return {
				mensagem: 'Usuario atualizado com sucesso!',
				dados: usuarioAlterado,
			};
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	@UseGuards(AuthGuard)
	@Delete('/:id')
	async deletarUsuario(@Param('id') id: string) {
		try {
			const usuarioRemovido = await this.usuarioService.deletarUsuario(id);
			return {
				mensagem: 'Usuario deletado com sucesso!',
				dados: usuarioRemovido,
			};
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}
}
