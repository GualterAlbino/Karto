import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'status_tenant' })
export class StatusTenantEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'descricao', length: 45, nullable: false })
	descricao: string;

	@CreateDateColumn({ name: 'criado_em' })
	criadoEm: string;

	@UpdateDateColumn({ name: 'alterado_em' })
	alteradoEm: string;

	@DeleteDateColumn({ name: 'deletado_em' })
	deletadoEm: string;
}
