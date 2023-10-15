import { PartialType } from '@nestjs/mapped-types';
import { CriaCidadeDto } from './cria-cidade.dto';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class AtualizaCidadeDto extends PartialType(CriaCidadeDto) {
  @IsString({ message: 'O campo "cidade" deve ser do tipo string!' })
	@IsNotEmpty({ message: 'O campo "cidade" é obrigatório!' })
	@IsOptional()
	nome: string;
}
