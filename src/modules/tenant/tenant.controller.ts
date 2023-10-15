import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CriaTenantDTO } from './dto/cria-tenant.dto';
import { HashearSenhaPipe } from 'src/resources/pipes/hashear-senha.pipe';
import { ListaTenantDTO } from './dto/lista-tenant.dto';

@Controller('tenant')
export class TenantController {
	constructor(private readonly tenantService: TenantService) {}

	@Post()
	async criarUsuario(
		@Body() { senha, ...dadosDoTenant }: CriaTenantDTO, //Descarto a senha sem o HASH
		@Body('senha', HashearSenhaPipe) senhaHasheada: string, //Aplicação do HASH de senha
	) {
		try {
			//Utilizo a senha com o HASH ao armazenar no banco
			const tenantCriado = await this.tenantService.criarTenant({
				...dadosDoTenant,
				senha: senhaHasheada,
			});

			return {
				mensagem: 'Tenant criado com sucesso!',
				dados: new ListaTenantDTO(tenantCriado.id, tenantCriado.nome),
			};
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}
}
