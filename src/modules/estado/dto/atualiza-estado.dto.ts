import { PartialType } from '@nestjs/mapped-types';
import { CriaEstadoDto } from './cria-estado.dto';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';


export class AtualizaEstadoDto extends PartialType(CriaEstadoDto) {
	@IsString({ message: 'O campo "estado" deve ser do tipo string!' })
	@IsNotEmpty({ message: 'O campo "estado" é obrigatório!' })
	@IsOptional()
	nome: string;
}
