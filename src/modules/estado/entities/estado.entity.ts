import { CidadeEntity } from 'src/modules/cidade/entities/cidade.entity';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryColumn,
	Unique,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'estado' })
export class EstadoEntity {
	@PrimaryColumn({ name: 'uf', length: 2, nullable: false })
	uf: string;

	@OneToMany(() => CidadeEntity, (cidade) => cidade.estado)
	cidade: CidadeEntity[];

	@Unique(['descricao'])
	@Column({ name: 'descricao', length: 45, nullable: false })
	descricao: string;

	@CreateDateColumn({ name: 'criado_em' })
	criadoEm: string;

	@UpdateDateColumn({ name: 'alterado_em' })
	alteradoEm: string;

	@DeleteDateColumn({ name: 'deletado_em' })
	deletadoEm: string;
}
