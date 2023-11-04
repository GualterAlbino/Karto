import { PartialType } from '@nestjs/mapped-types';
import { CriaCidadeDto } from './cria-cidade.dto';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AtualizaCidadeDto extends PartialType(CriaCidadeDto) {
	@ApiProperty()
  @IsString({ message: 'O campo "cidade" deve ser do tipo string!' })
	@IsNotEmpty({ message: 'O campo "cidade" é obrigatório!' })
	@IsOptional()
	nome: string;
}
