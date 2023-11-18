import { PartialType } from '@nestjs/mapped-types';
import { CriaCidadeDto } from './cria-cidade.dto';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EstadoEntity } from 'src/modules/estado/entities/estado.entity';

export class AtualizaCidadeDto extends PartialType(CriaCidadeDto) {
	@ApiProperty()
	@IsOptional()
	@IsString()
	@IsNotEmpty({ message: 'Nome do cidade não pode ser vazio!' })
	descricao: string;

	@ApiProperty()
	@IsOptional()
	@IsNotEmpty({ message: 'Valor do frete não pode ser vazio!' })
	valorFrete: number;

	@ApiProperty()
	@IsOptional()
	@IsNotEmpty({
		message: 'Estado ao qual a cidade pertence não pode ser vazio!',
	})
	estado: EstadoEntity;
}
