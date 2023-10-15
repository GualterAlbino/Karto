import { IsEmail, IsNotEmpty } from 'class-validator';

export class AutenticaDTO {
	@IsEmail(undefined, { message: 'Email inválido!' })
	email: string;

	@IsNotEmpty({ message: 'A senha não pode ser vazia!' })
	senha: string;
}
