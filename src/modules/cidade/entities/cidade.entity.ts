<<<<<<< HEAD
import { BairroEntity } from 'src/modules/bairro/entities/bairro.entity';
import { EstadoEntity } from 'src/modules/estado/entities/estado.entity';
import { UsuarioEntity } from 'src/modules/usuario/entities/usuario.entity';
=======
>>>>>>> feature/Entidade_Cidade
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
<<<<<<< HEAD
	ManyToOne,
	OneToMany,
=======
>>>>>>> feature/Entidade_Cidade
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'cidade' })
export class CidadeEntity {
<<<<<<< HEAD
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
=======
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({name: 'descricao', length: 45, unique: true})
  descricao: string;

  @CreateDateColumn({ name: 'criado_em' })
>>>>>>> feature/Entidade_Cidade
	criadoEm: string;

	@UpdateDateColumn({ name: 'alterado_em' })
	alteradoEm: string;

	@DeleteDateColumn({ name: 'deletado_em' })
	deletadoEm: string;
}
