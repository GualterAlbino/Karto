import { IsNotEmpty, IsString} from "class-validator";

export class CriaCategoriaDto {
  @IsString()
	@IsNotEmpty({ message: 'Nome de usuario não pode ser vazio!' })
	nome: string;
}
