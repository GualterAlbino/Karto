import { PartialType } from '@nestjs/mapped-types';
import { CriaCategoriaDto } from './cria-categoria.dto';

import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class AtualizaCategoriaDto extends PartialType(CriaCategoriaDto) {
	@IsString({ message: 'O campo "descricao" deve ser do tipo string!' })
	@IsNotEmpty({ message: 'O campo "descricao" é obrigatório!' })
	@IsOptional()
	descricao: string;
}
