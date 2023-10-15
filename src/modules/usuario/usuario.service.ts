import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
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
		try {
			const usuarioEntity = new UsuarioEntity();

			usuarioEntity.id = uuid(); //??
			usuarioEntity.nome = dadosDoUsuario.nome;
			usuarioEntity.email = dadosDoUsuario.email;
			usuarioEntity.senha = dadosDoUsuario.senha;

			const checkEmail = await this.usuarioRepository.findOne({
				where: { email: usuarioEntity.email },
			});
			//Valida se o e-mail já está sendo utilizado
			if (checkEmail) {
				throw new ConflictException(
					`O e-mail ${usuarioEntity.email} já está sendo utilizado.`,
				);
			}

			return this.usuarioRepository.save(usuarioEntity);
		} catch (error) {
			throw new ConflictException(error.message);
		}
	}

	async buscaTodosUsuarios() {
		try {
			const usuariosExistentes = await this.usuarioRepository.find();

			const usuarios = usuariosExistentes.map(
				(usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
			);

			return usuarios;
		} catch (error) {
			throw new ConflictException(error.message);
		}
	}

	async buscaUsuarioPorEmail(email: string) {
		try {
			
			const checkEmail = await this.usuarioRepository.findOne({
				where: { email: email },
			});

			return checkEmail;
		} catch (error) {
			throw new ConflictException(error.message);
		}
	}

	async buscaUsuarioPorID(id: string) {
		try {
			const checkID = await this.usuarioRepository.findOne({
				where: { id },
			});

			return checkID;
		} catch (error) {
			throw new ConflictException(error.message);
		}
	}

	async atualizarUsuario(id: string, usuarioEntity: AtualizaUsuarioDTO) {
		try {
			const usuarioAtualizado = await this.usuarioRepository.update(
				id,
				usuarioEntity,
			);

			if (usuarioAtualizado.affected === 0) {
				throw new NotFoundException(
					`O usuario não foi encontrado e não pôde ser atualizado.`,
				);
			}
		} catch (error) {
			throw new ConflictException(error.message);
		}
	}

	async deletarUsuario(id: string) {
		try {
			const usuarioDeletado = await this.usuarioRepository.delete(id);

			if (usuarioDeletado.affected === 0) {
				throw new ConflictException(
					`O usuario com o ID: " ${id} " não foi encontrado! Nenhum registro foi afetado.`,
				);
			}
		} catch (error) {
			throw new ConflictException(error.message);
		}
	}
}
