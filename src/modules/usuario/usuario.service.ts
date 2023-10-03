import { Injectable } from '@nestjs/common';
import { CriaUsuarioDTO } from './dto/cria-usuario.dto';
import { AtualizaUsuarioDTO } from './dto/atualiza-usuario.dto';
import { UsuarioEntity } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListaUsuarioDTO } from './dto/lista-usuario.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsuarioService {
	constructor(
		@InjectRepository(UsuarioEntity)
		private readonly usuarioRepository: Repository<UsuarioEntity>,
	) {}

	async criarUsuario(dadosDoUsuario: CriaUsuarioDTO) {
		const usuarioEntity = new UsuarioEntity();

		usuarioEntity.id = uuid(); //??
		usuarioEntity.nome = dadosDoUsuario.nome;
		usuarioEntity.email = dadosDoUsuario.email;
		usuarioEntity.senha = dadosDoUsuario.senha;

		return this.usuarioRepository.save(usuarioEntity);
	}

	async buscaTodosUsuarios() {
		const usuariosExistentes = await this.usuarioRepository.find();

		const usuarios = usuariosExistentes.map(
			(usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
		);

		return usuarios;
	}

	async buscaUsuarioPorEmail(email: string) {
		const checkEmail = await this.usuarioRepository.findOne({
			where: { email },
		});

		return checkEmail;
	}

	async buscaUsuarioPorID(id: string) {
		const checkID = await this.usuarioRepository.findOne({
			where: { id },
		});

		return checkID;
	}

	async atualizarUsuario(id: string, usuarioEntity: AtualizaUsuarioDTO) {
		await this.usuarioRepository.update(id, usuarioEntity);
	}

	async deletarUsuario(id: string) {
		await this.usuarioRepository.delete(id);
	}
}
