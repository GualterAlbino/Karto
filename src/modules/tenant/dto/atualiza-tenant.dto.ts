import {
	IsEmail,
	IsString,
	MinLength,
	IsNotEmpty,
	IsOptional,
} from 'class-validator';
import { StatusTenantEntity } from 'src/modules/status_tenant/entities/status.tenant.entity';

export class AtualizaTenantDTO {
	//@IsOptional() //==>Se não informar o id, o NestJs não irá validar o campo, mas se informar validará

	@IsOptional()
	status: StatusTenantEntity;

	@IsOptional()
	slug: string;

	@IsOptional()
	nome: string;

	@IsOptional()
	corPrincipal: string;

	@IsOptional()
	@IsEmail(undefined, { message: 'O campo "email" deve ser um email válido!' })
	email: string;

	@IsOptional()
	senha: string;
}
