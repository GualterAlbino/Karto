import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'estado' }) 
export class EstadoEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'descricao', length: 45 })
	descricao: string;

	@Column({ name: 'uf', length: 2, unique: true })
	uf: string;

	@CreateDateColumn({ name: 'criado_em' })
	criadoEm: string;

	@UpdateDateColumn({ name: 'alterado_em' })
	alteradoEm: string;

	@DeleteDateColumn({ name: 'deletado_em' })
	deletadoEm: string;
}
