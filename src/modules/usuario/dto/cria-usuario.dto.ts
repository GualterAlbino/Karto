import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";


export class CriaUsuarioDTO {
	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'Nome de usuario não pode ser vazio!' })
	nome: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'E-mail de usuario não pode ser vazio!' })
	email: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty({ message: 'Senha de usuario não pode ser vazio!' })
	@MinLength(3, { message: 'A senha precisa ter pelo menos 3 caracteres' })
	// @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+)(.{6,30})$/, {
  //   message: 'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito, um caractere especial e ter entre 3 e 30 caracteres',
  // })
	senha: string;
}
