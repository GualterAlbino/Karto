import { TenantEntity } from 'src/modules/tenant/entities/tenant.entity';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'banner' })
export class BannerEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	//Tenant
	@ManyToOne(() => TenantEntity, (tenant) => tenant.banner)
	tenant: TenantEntity;

	@Column({ name: 'imagem', length: 255, nullable: true })
	imagem: string;

	@CreateDateColumn({ name: 'criado_em' })
	criadoEm: string;

	@UpdateDateColumn({ name: 'alterado_em' })
	alteradoEm: string;

	@DeleteDateColumn({ name: 'deletado_em' })
	deletadoEm: string;
}
