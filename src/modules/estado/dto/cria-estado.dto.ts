import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString} from "class-validator";

export class CriaEstadoDto {
	@ApiProperty()
  @IsString()
	@IsNotEmpty({ message: 'Nome do estado não pode ser vazio!' })
	descricao: string;
	@IsNotEmpty({ message: 'A UF do estado não pode ser vazio!' })
	uf: string;
}
