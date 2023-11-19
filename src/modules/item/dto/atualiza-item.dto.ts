
import {  IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AtualizaItemDTO {
	@ApiProperty()
	@IsOptional()
	nome: string;

	@ApiProperty()
	@IsOptional()
	descricao: string;

  @ApiProperty()
	@IsOptional()
	imagem: string;

  @ApiProperty()
	@IsOptional()
	valor: Number;

  @ApiProperty()
  @IsOptional()
  tenantId: string;

  @ApiProperty()
  @IsOptional()
  categoriaId: string;
}
