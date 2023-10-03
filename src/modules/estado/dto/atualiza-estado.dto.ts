import { PartialType } from '@nestjs/mapped-types';
import { CriaEstadoDto } from './cria-estado.dto';

import {
	IsEmail,
	IsString,
	MinLength,
	IsNotEmpty,
	IsOptional,
} from 'class-validator';
import { randomUUID } from 'crypto';

export class AtualizaEstadoDto extends PartialType (CriaEstadoDto){
  @IsString({ message: 'O campo "estado" deve ser do tipo string!' })
	@IsNotEmpty({ message: 'O campo "estado" é obrigatório!' })
	@IsOptional()
	nome: string;
}
