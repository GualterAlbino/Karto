import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AutenticaDTO {
	@ApiProperty()
	@IsEmail(undefined, { message: 'Email inválido!' })
	email: string;

	@ApiProperty()
	@IsNotEmpty({ message: 'A senha não pode ser vazia!' })
	senha: string;
}
