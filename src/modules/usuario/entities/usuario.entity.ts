import { UsuarioEnderecoEntity } from 'src/modules/usuario_endereco/entities/usuario.endereco.entity';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'usuario' })
export class UsuarioEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@OneToMany(
		() => UsuarioEnderecoEntity,
		(usuario_endereco) => usuario_endereco.usuario,
	)
	usuario_endereco: UsuarioEnderecoEntity[];

	@Column({ name: 'nome', length: 255, nullable: false })
	nome: string;

	@Unique(['email'])
	@Column({ name: 'email', length: 255, nullable: false })
	email: string;

	@Column({ name: 'senha', length: 10, nullable: false })
	senha: string;

	@CreateDateColumn({ name: 'criado_em' })
	criadoEm: string;

	@UpdateDateColumn({ name: 'alterado_em' })
	alteradoEm: string;

	@DeleteDateColumn({ name: 'deletado_em' })
	deletadoEm: string;
}
