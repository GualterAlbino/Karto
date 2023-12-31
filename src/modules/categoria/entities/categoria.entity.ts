import { ItemEntity } from 'src/modules/item/entities/item.entity';
import { TenantEntity } from 'src/modules/tenant/entities/tenant.entity';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'categoria' })
export class CategoriaEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Unique(['descricao'])
	@Column({ name: 'descricao', length: 255, nullable: false })
	descricao: string;

	//Tenant
	@ManyToOne(() => TenantEntity, (tenant) => tenant.categoria)
	tenant: TenantEntity;

	//Item
	@OneToMany(() => ItemEntity, (item) => item.categoria)
	item: ItemEntity[];

	@CreateDateColumn({ name: 'criado_em' })
	criadoEm: string;

	@UpdateDateColumn({ name: 'alterado_em' })
	alteradoEm: string;

	@DeleteDateColumn({ name: 'deletado_em' })
	deletadoEm: string;
}
