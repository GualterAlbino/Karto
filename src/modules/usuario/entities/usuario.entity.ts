import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'usuarios' }) //Nome da tabela no banco no plural
export class UsuarioEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'nome', length: 255, nullable: false })
	nome: string;

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
