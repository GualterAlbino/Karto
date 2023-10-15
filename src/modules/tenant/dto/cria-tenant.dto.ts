import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CriaTenantDTO {
	@IsString()
	@IsNotEmpty({ message: 'Subdomínio não pode ser vazio!' })
	slug: string;

	@IsString()
	@IsNotEmpty({ message: 'Nome do estabelecimento não pode ser vazio!' })
	nome: string;

	@IsString()
	corPrincipal: string;

	@IsString()
	@IsNotEmpty({ message: 'E-mail não pode ser vazio!' })
	email: string;

	@IsString()
	@IsNotEmpty({ message: 'O campo de senha não pode ser vazio!' })
	@MinLength(3, { message: 'A senha precisa ter pelo menos 3 caracteres' })
	// @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+)(.{6,30})$/, {
	//   message: 'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito, um caractere especial e ter entre 3 e 30 caracteres',
	// })
	senha: string;
}
