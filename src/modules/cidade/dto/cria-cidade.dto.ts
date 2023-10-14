import { IsNotEmpty, IsString} from "class-validator";

export class CriaCidadeDto {
  @IsString()
	
	@IsNotEmpty({ message: 'Nome do cidade não pode ser vazio!' })
	descricao: string;
	
}
