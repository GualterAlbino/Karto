import { HistoricoPedidoEntity } from 'src/modules/historico_pedido/entities/historico.pedido.entity';
import { TenantEntity } from 'src/modules/tenant/entities/tenant.entity';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'status_pedido' })
export class StatusPedidoEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	//HistoricoPedido
	@OneToMany(() => HistoricoPedidoEntity, (historicoPedido) => historicoPedido.statusPedido)
	historico: HistoricoPedidoEntity;

	@Column({ name: 'descricao', length: 45, nullable: false })
	descricao: string;

	@CreateDateColumn({ name: 'criado_em' })
	criadoEm: string;

	@UpdateDateColumn({ name: 'alterado_em' })
	alteradoEm: string;

	@DeleteDateColumn({ name: 'deletado_em' })
	deletadoEm: string;
}
