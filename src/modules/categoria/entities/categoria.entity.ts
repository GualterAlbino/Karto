import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
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

	//@Column({ name: 'id_tenant', length: 255, nullable: false })
	//id_tenant: number;

	@CreateDateColumn({ name: 'criado_em' })
	criadoEm: string;

	@UpdateDateColumn({ name: 'alterado_em' })
	alteradoEm: string;

	@DeleteDateColumn({ name: 'deletado_em' })
	deletadoEm: string;
}
