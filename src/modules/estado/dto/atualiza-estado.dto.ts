import { PartialType } from '@nestjs/mapped-types';
import { CriaEstadoDto } from './cria-estado.dto';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AtualizaEstadoDto extends PartialType(CriaEstadoDto) {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	uf: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	descricao: string;
}
