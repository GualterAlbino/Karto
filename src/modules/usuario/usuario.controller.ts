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
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CriaUsuarioDTO } from './dto/cria-usuario.dto';
import { AtualizaUsuarioDTO } from './dto/atualiza-usuario.dto';

@Controller('/usuario')
export class UsuarioController {
	constructor(private readonly usuarioService: UsuarioService) {}

	@Post()
	async criarUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
		try {
			const usuarioCriado =
				await this.usuarioService.criarUsuario(dadosDoUsuario);

			return {
				mensagem: 'Usuario criado com sucesso!',
				dados: usuarioCriado,
			};
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	@Get()
	async buscaTodosUsuarios() {
		try {
			const usuarios = await this.usuarioService.buscaTodosUsuarios();

			return usuarios;
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

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

			return usuarioProcurado;
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	@Get('/:id')
	async buscaUsuarioPorID(@Param('id') id: string) {
		try {
			const usuarioProcurado = await this.usuarioService.buscaUsuarioPorID(id);

			if (usuarioProcurado == null) {
				return {
					mensagem: 'Usuario não encontrado!',
				};
			}

			return usuarioProcurado;
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

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
