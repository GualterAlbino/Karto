import { IsNotEmpty, IsString, MinLength } from "class-validator";


export class CriaUsuarioDTO {
	@IsString()
	@IsNotEmpty({ message: 'Nome de usuario não pode ser vazio!' })
	nome: string;

	@IsString()
	@IsNotEmpty({ message: 'E-mail de usuario não pode ser vazio!' })
	email: string;

	@IsString()
	@IsNotEmpty({ message: 'Senha de usuario não pode ser vazio!' })
	@MinLength(10, { message: 'A senha precisa ter pelo menos 10 caracteres' })
	senha: string;
}
