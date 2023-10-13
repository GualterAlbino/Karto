import { HistoricoPedidoEntity } from 'src/modules/historico_pedido/entities/historico.pedido.entity';
import { UsuarioEntity } from 'src/modules/usuario/entities/usuario.entity';
import { UsuarioEnderecoEntity } from 'src/modules/usuario_endereco/entities/usuario.endereco.entity';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'pedido' })
export class PedidoEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	//Usuario
	@OneToMany(() => UsuarioEntity, (usuario) => usuario.pedido)
	usuario: UsuarioEntity;

	//Endereço
	@OneToMany(() => UsuarioEnderecoEntity, (endereco) => endereco.pedido)
	endereco: UsuarioEnderecoEntity;

	//Historico
	@OneToMany(() => HistoricoPedidoEntity, (historico) => historico.pedido)
	historico: HistoricoPedidoEntity[];


	@Column({ name: 'metodo_pagamento', length: 45, nullable: false })
	metodoPagamento: string;

	@Column({ name: 'valor_total', nullable: false })
	valorTotal: Number;

	@Column({ name: 'valor_frete', nullable: false })
	valorFrete: Number;

	@Column({ name: 'valor_desconto', nullable: false })
	valorDesconto: Number;

	@Column({ name: 'troco', nullable: false })
	troco: Number;

	@CreateDateColumn({ name: 'criado_em' })
	criadoEm: string;

	@UpdateDateColumn({ name: 'alterado_em' })
	alteradoEm: string;

	@DeleteDateColumn({ name: 'deletado_em' })
	deletadoEm: string;
}
