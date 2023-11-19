import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CategoriaEntity } from "src/modules/categoria/entities/categoria.entity";
import { TenantEntity } from "src/modules/tenant/entities/tenant.entity";

export class CriaItemDTO {
	@ApiProperty()
  @IsString()
	@IsNotEmpty()
	nome: string;

  @ApiProperty()
  @IsString()
	@IsNotEmpty()
	descricao: string;

  @ApiProperty()
  @IsString()
	@IsNotEmpty()
	imagem: string;

  @ApiProperty()
	@IsNotEmpty()
	valor: Number;

  @ApiProperty()
  @IsString()
	@IsNotEmpty()
  tenantId: string

  @ApiProperty()
  @IsString()
	@IsNotEmpty()
  categoriaId: string

}
