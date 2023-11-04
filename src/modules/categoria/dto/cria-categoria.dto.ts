import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString} from "class-validator";


export class CriaCategoriaDto {
	@ApiProperty()
  @IsString()
	@IsNotEmpty({ message: 'Descrição da categoria não pode ser vazia!' })
	descricao: string;
}
