import { IsNotEmpty, IsString} from "class-validator";


export class CriaCategoriaDto {
  @IsString()
	@IsNotEmpty({ message: 'Descrição da categoria não pode ser vazia!' })
	descricao: string;
}
