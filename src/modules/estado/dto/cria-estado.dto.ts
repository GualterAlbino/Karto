import { IsNotEmpty, IsString} from "class-validator";

export class CriaEstadoDto {
  @IsString()
	
	@IsNotEmpty({ message: 'Nome do estado não pode ser vazio!' })
	descricao: string;

	@IsNotEmpty({ message: 'A UF do estado não pode ser vazio!' })
	uf: string;
}
