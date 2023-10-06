import { CidadeEntity } from 'src/modules/cidade/entities/cidade.entity';
import { UsuarioEntity } from 'src/modules/usuario/entities/usuario.entity';
import { UsuarioEnderecoEntity } from 'src/modules/usuario_endereco/entities/usuario.endereco.entity';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Double,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'bairro' })
export class BairroEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	//Tenant

	//Cidade
	@ManyToOne(() => CidadeEntity, (cidade) => cidade.bairro)
	cidade: CidadeEntity;

	//Usuario_Endereco
	@OneToMany(
		() => UsuarioEnderecoEntity,
		(usuario_endereco) => usuario_endereco.bairro,
	)
	usuario_endereco: UsuarioEnderecoEntity[];

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
