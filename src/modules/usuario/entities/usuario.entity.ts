import { PedidoEntity } from 'src/modules/pedido/entities/pedido.entity';
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

	//Endereços
	@OneToMany(
		() => UsuarioEnderecoEntity,
		(usuarioEndereco) => usuarioEndereco.usuario,
	)
	usuarioEndereco: UsuarioEnderecoEntity[];

	//Pedidos
	@OneToMany(() => PedidoEntity, (pedido) => pedido.usuario)
	pedido: PedidoEntity[];

	@Column({ name: 'nome', length: 255, nullable: false })
	nome: string;

	@Unique(['email'])
	@Column({ name: 'email', length: 255, nullable: false })
	email: string;

	@Column({ name: 'senha', length: 255, nullable: false })
	senha: string;

	@CreateDateColumn({ name: 'criado_em' })
	criadoEm: string;

	@UpdateDateColumn({ name: 'alterado_em' })
	alteradoEm: string;

	@DeleteDateColumn({ name: 'deletado_em' })
	deletadoEm: string;
}
