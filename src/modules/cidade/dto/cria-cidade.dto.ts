import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString} from "class-validator";
import { EstadoEntity } from "src/modules/estado/entities/estado.entity";

export class CriaCidadeDto {
	@ApiProperty()
  @IsString()
	@IsNotEmpty({ message: 'Nome do cidade não pode ser vazio!' })
	descricao: string;

	@ApiProperty()
	@IsNotEmpty({ message: 'Valor do frete não pode ser vazio!' })
	valorFrete: number;

	@ApiProperty()
	@IsNotEmpty({ message: 'Estado ao qual a cidade pertence não pode ser vazio!' })
	estado: EstadoEntity;


	
}
