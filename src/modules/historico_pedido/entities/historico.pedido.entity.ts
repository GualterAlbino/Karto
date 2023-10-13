import { CidadeEntity } from 'src/modules/cidade/entities/cidade.entity';
import { PedidoEntity } from 'src/modules/pedido/entities/pedido.entity';
import { StatusPedidoEntity } from 'src/modules/status_pedido/entity/status.pedido.entity';
import { TenantEntity } from 'src/modules/tenant/entities/tenant.entity';
import { UsuarioEntity } from 'src/modules/usuario/entities/usuario.entity';
import { UsuarioEnderecoEntity } from 'src/modules/usuario_endereco/entities/usuario.endereco.entity';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'historico_pedido' })
export class HistoricoPedidoEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	//Pedido
	@ManyToOne(() => PedidoEntity, (pedido) => pedido.historico)
	pedido: PedidoEntity[];

	@ManyToOne(() => StatusPedidoEntity, (statusPedido) => statusPedido.historico)
	statusPedido: StatusPedidoEntity[];

	@CreateDateColumn({ name: 'criado_em' })
	criadoEm: string;

	@UpdateDateColumn({ name: 'alterado_em' })
	alteradoEm: string;

	@DeleteDateColumn({ name: 'deletado_em' })
	deletadoEm: string;
}
