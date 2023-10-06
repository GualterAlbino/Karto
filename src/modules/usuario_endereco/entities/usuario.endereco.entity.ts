import { BairroEntity } from 'src/modules/bairro/entities/bairro.entity';
import { UsuarioEntity } from 'src/modules/usuario/entities/usuario.entity';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'usuario_endereco' })
export class UsuarioEnderecoEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

  //Usuario
	@ManyToOne(() => UsuarioEntity, (usuario) => usuario.usuario_endereco)
	usuario: UsuarioEntity;

  //Bairro
  @ManyToOne(() => BairroEntity, (bairro) => bairro.usuario_endereco)
  bairro: BairroEntity;

	@Column({ name: 'cep', length: 8, nullable: false })
	cep: string;

	@Column({ name: 'rua', length: 255, nullable: false })
	rua: string;

	@Column({ name: 'numero', length: 10, nullable: false })
	numero: string;

	@Column({ name: 'complemento', length: 255, nullable: false })
	complemento: string;

	@CreateDateColumn({ name: 'criado_em' })
	criadoEm: string;

	@UpdateDateColumn({ name: 'alterado_em' })
	alteradoEm: string;

	@DeleteDateColumn({ name: 'deletado_em' })
	deletadoEm: string;
}
