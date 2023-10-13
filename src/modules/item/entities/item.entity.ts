import { CategoriaEntity } from 'src/modules/categoria/entities/categoria.entity';
import { ItemPedidoEntity } from 'src/modules/item_pedido/entities/item.pedido.entity';
import { TenantEntity } from 'src/modules/tenant/entities/tenant.entity';
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

@Entity({ name: 'item' })
export class ItemEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	//Tenant
	@ManyToOne(() => TenantEntity, (tenant) => tenant.item)
	tenant: TenantEntity;

	//Categoria
	@ManyToOne(() => CategoriaEntity, (categoria) => categoria.item)
	categoria: CategoriaEntity;

	//Lista de Itens do pedido
	@OneToMany(() => ItemPedidoEntity, (item) => item.item)
	itemPedido: ItemPedidoEntity[];

	@Column({ name: 'nome', length: 255, nullable: false })
	nome: string;

	@Column({ name: 'descricao', length: 255, nullable: false })
	descricao: string;

	@Column({ name: 'imagem', length: 255, nullable: true })
	imagem: string;

	@Column({ name: 'valor', nullable: false })
	valor: Number;

	@CreateDateColumn({ name: 'criado_em' })
	criadoEm: string;

	@UpdateDateColumn({ name: 'alterado_em' })
	alteradoEm: string;

	@DeleteDateColumn({ name: 'deletado_em' })
	deletadoEm: string;
}
