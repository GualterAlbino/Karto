import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class AtualizaStatusTenantDTO {
	//@IsOptional() //==>Se não informar o id, o NestJs não irá validar o campo, mas se informar validará
	@ApiProperty()
	@IsOptional()
	id: string;

	@ApiProperty()
	@IsNotEmpty({ message: 'O campo "descricao" não pode ser vazio!' })
	descricao: string;
}
