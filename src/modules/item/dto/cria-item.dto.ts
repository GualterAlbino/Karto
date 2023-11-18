import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { CategoriaEntity } from "src/modules/categoria/entities/categoria.entity";
import { TenantEntity } from "src/modules/tenant/entities/tenant.entity";

export class CriaItemDTO {
	@ApiProperty()
	nome: string;

  @ApiProperty()
	descricao: string;

  @ApiProperty()
  @IsOptional()
	imagem: string;

  @ApiProperty()
	valor: Number;

  @ApiProperty()
  tenant: string

  @ApiProperty()
  categoria: string
}
