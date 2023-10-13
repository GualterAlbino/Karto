import { BairroEntity } from 'src/modules/bairro/entities/bairro.entity';
import { BannerEntity } from 'src/modules/banners/entities/banner.entity';
import { CategoriaEntity } from 'src/modules/categoria/entities/categoria.entity';
import { ItemEntity } from 'src/modules/item/entities/item.entity';
import { StatusTenantEntity } from 'src/modules/status_tenant/entities/status.tenant.entity';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tenant' })
export class TenantEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	//Status
	@OneToOne(() => StatusTenantEntity)
	status: StatusTenantEntity;

	//Bairro
	@OneToMany(() => BairroEntity, (bairro) => bairro.tenant)
	bairro: BairroEntity[];

	//Banner
	@OneToMany(() => BannerEntity, (banner) => banner.tenant)
	banner: BannerEntity[];

	//Categoria
	@OneToMany(() => CategoriaEntity, (categoria) => categoria.tenant)
	categoria: CategoriaEntity[];

	//Item
	@OneToMany(() => ItemEntity, (item) => item.tenant)
	item: ItemEntity[];

	@Unique(['slug'])
	@Column({ name: 'slug', length: 45, nullable: false })
	slug: string;

	@Unique(['nome'])
	@Column({ name: 'nome', length: 45, nullable: false })
	nome: string;

	@Column({ name: 'cor_principal', length: 45, nullable: true })
	corPrincipal: string;

	@Column({ name: 'email', length: 45, nullable: false })
	email: string;

	@Column({ name: 'senha', length: 45, nullable: false })
	senha: string;

	@CreateDateColumn({ name: 'criado_em' })
	criadoEm: string;

	@UpdateDateColumn({ name: 'alterado_em' })
	alteradoEm: string;

	@DeleteDateColumn({ name: 'deletado_em' })
	deletadoEm: string;
}
