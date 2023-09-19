import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Put,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CriaUsuarioDTO } from './dto/cria-usuario.dto';
import { AtualizaUsuarioDTO } from './dto/atualiza-usuario.dto';

@Controller('/usuario')
export class UsuarioController {
	constructor(private readonly usuarioService: UsuarioService) {}

	@Post()
	async criarUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
		const usuarioCriado =
			await this.usuarioService.criarUsuario(dadosDoUsuario);

		return {
			mensagem: 'Usuario criado com sucesso!',
			dados: usuarioCriado,
		};
	}

	@Get()
	async buscaTodosUsuarios() {
		const usuarios = await this.usuarioService.buscaTodosUsuarios();

		return usuarios;
	}

	@Get('/:id')
	async buscaUsuarioPorEmail(@Param('email') email: string) {
		const usuarioProcurado =
			await this.usuarioService.buscaUsuarioPorEmail(email);

		if (usuarioProcurado == null) {
			return {
				mensagem: 'Usuario não encontrado!',
			};
		}

		return usuarioProcurado;
	}

	@Get('/:id')
	async buscaUsuarioPorID(@Param('id') id: string) {
		const usuarioProcurado = await this.usuarioService.buscaUsuarioPorID(id);

		if (usuarioProcurado == null) {
			return {
				mensagem: 'Usuario não encontrado!',
			};
		}

		return usuarioProcurado;
	}

	@Put('/:id')
	async atualizarUsuario(
		@Param('id') id: string,
		@Body() dadosDoUsuario: AtualizaUsuarioDTO,
	) {
		const usuarioAlterado = await this.usuarioService.atualizarUsuario(
			id,
			dadosDoUsuario,
		);
		return {
			mensagem: 'Usuario atualizado com sucesso!',
			dados: usuarioAlterado,
		};
	}

	@Delete('/:id')
	async deletarUsuario(@Param('id') id: string) {
		const usuarioRemovido = await this.usuarioService.deletarUsuario(id);
		return {
			mensagem: 'Usuario deletado com sucesso!',
			dados: usuarioRemovido,
		};
	}
}
