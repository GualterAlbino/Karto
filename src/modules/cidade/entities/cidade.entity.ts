import { BairroEntity } from 'src/modules/bairro/entities/bairro.entity';
import { EstadoEntity } from 'src/modules/estado/entities/estado.entity';
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

@Entity({ name: 'cidade' })
export class CidadeEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	//Estado
	@ManyToOne(() => EstadoEntity, (estado) => estado.cidade)
	estado: EstadoEntity;

	//Bairro
	@OneToMany(() => BairroEntity, (bairro) => bairro.cidade)
	bairro: BairroEntity[];

	@Column({ name: 'descricao', length: 45, nullable: false })
	descricao: string;

	@Column({ name: 'valor_frete', nullable: false })
	valor_frete: Number;

	@CreateDateColumn({ name: 'criado_em' })
	criadoEm: string;

	@UpdateDateColumn({ name: 'alterado_em' })
	alteradoEm: string;

	@DeleteDateColumn({ name: 'deletado_em' })
	deletadoEm: string;
}
