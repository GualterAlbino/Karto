import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({name: 'estados'}) //Nome da tabela no banco no plural

export class EstadoEntity {

  @PrimaryGeneratedColumn('uuid')
	id: string;

  @Column({ name: 'descricao', length: 45})
  descricao: string; 

	@Column({ name: 'uf', length: 2, unique: true})
  uf: string;

	
}
