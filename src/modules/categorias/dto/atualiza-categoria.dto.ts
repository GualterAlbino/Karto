import { PartialType } from '@nestjs/mapped-types';
import { CriaCategoriaDto } from './cria-categoria.dto';

import {
	IsEmail,
	IsString,
	MinLength,
	IsNotEmpty,
	IsOptional,
} from 'class-validator';
import { randomUUID } from 'crypto';

export class AtualizaCategoriaDto extends PartialType(CriaCategoriaDto) {
  @IsString({ message: 'O campo "nome" deve ser do tipo string!' })
	@IsNotEmpty({ message: 'O campo "nome" é obrigatório!' })
	@IsOptional()
	nome: string;
}

