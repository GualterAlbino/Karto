import { ApiProperty } from '@nestjs/swagger';
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
	@ApiProperty()
	@IsOptional()
	status: StatusTenantEntity;

	@ApiProperty()
	@IsOptional()
	slug: string;

	@ApiProperty()
	@IsOptional()
	nome: string;

	@ApiProperty()
	@IsOptional()
	corPrincipal: string;

	@ApiProperty()
	@IsOptional()
	@IsEmail(undefined, { message: 'O campo "email" deve ser um email válido!' })
	email: string;

	@ApiProperty()
	@IsOptional()
	senha: string;
}
