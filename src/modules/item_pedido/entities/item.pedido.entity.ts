import { ItemEntity } from 'src/modules/item/entities/item.entity';
import { PedidoEntity } from 'src/modules/pedido/entities/pedido.entity';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'item_pedido' })
export class ItemPedidoEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	//Itens
	@OneToMany(() => ItemEntity, (item) => item.itemPedido)
	item: ItemEntity[];

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
