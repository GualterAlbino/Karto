import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CriaStatusTenantDTO {
	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'Descrição não pode ser vazia!' })
	descricao: string;
}
