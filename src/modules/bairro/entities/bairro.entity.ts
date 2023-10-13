import { CidadeEntity } from 'src/modules/cidade/entities/cidade.entity';
import { TenantEntity } from 'src/modules/tenant/entities/tenant.entity';
import { UsuarioEnderecoEntity } from 'src/modules/usuario_endereco/entities/usuario.endereco.entity';
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

@Entity({ name: 'bairro' })
export class BairroEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	//Tenant
	@ManyToOne(() => TenantEntity, (tenant) => tenant.bairro)
	tenant: TenantEntity;

	//Cidade
	@ManyToOne(() => CidadeEntity, (cidade) => cidade.bairro)
	cidade: CidadeEntity;

	//Bairro
	@OneToMany(() => UsuarioEnderecoEntity, (usuario) => usuario.bairro)
	usuario: UsuarioEnderecoEntity[];

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
