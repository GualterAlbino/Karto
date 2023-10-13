import { BairroEntity } from 'src/modules/bairro/entities/bairro.entity';
import { PedidoEntity } from 'src/modules/pedido/entities/pedido.entity';
import { UsuarioEntity } from 'src/modules/usuario/entities/usuario.entity';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'usuario_endereco' })
export class UsuarioEnderecoEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	//Usuario
	@ManyToOne(() => UsuarioEntity, (usuario) => usuario.usuarioEndereco)
	usuario: UsuarioEntity;

	//Bairro
	@ManyToOne(() => BairroEntity, (bairro) => bairro.usuario)
	bairro: BairroEntity;

	//Pedidos
	@OneToMany(() => PedidoEntity, (pedido) => pedido.endereco)
	pedido: PedidoEntity[];

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
