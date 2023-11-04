import {
	IsEmail,
	IsString,
	MinLength,
	IsNotEmpty,
	IsOptional,
} from 'class-validator';
import { EmailUnico } from '../decorator/IsEmailUnico';
import { randomUUID } from 'crypto';
import { ApiProperty } from '@nestjs/swagger';

//Ao utilizar class Validator, é possivel especificar as mensagens de erro
export class AtualizaUsuarioDTO {
	//@IsOptional() //==>Se não informar o id, o NestJs não irá validar o campo, mas se informar validará

	@ApiProperty()
	@IsString({ message: 'O campo "nome" deve ser do tipo string!' })
	@IsNotEmpty({ message: 'O campo "nome" é obrigatório!' })
	@IsOptional()
	nome: string;

	@ApiProperty()
	@IsEmail(undefined, { message: 'O campo "email" deve ser um email válido!' })
	@EmailUnico({ message: 'O email $value já está cadastrado!' })
	@IsOptional()
	email: string;

	@ApiProperty()
	@MinLength(6, { message: 'O campo "senha" deve ter no mínimo 6 caracteres!' })
	@IsOptional()
	senha: string;
}
