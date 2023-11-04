import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString} from "class-validator";

export class CriaCidadeDto {
	@ApiProperty()
  @IsString()
	@IsNotEmpty({ message: 'Nome do cidade não pode ser vazio!' })
	descricao: string;
	
}
