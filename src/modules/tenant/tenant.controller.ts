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
	UseGuards,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CriaTenantDTO } from './dto/cria-tenant.dto';
import { HashearSenhaPipe } from 'src/resources/pipes/hashear-senha.pipe';
import { ListaTenantDTO } from './dto/lista-tenant.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tenant')
@Controller('tenant')
export class TenantController {
	constructor(private readonly tenantService: TenantService) {}

	@Post()
	async criarTenant(
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
				mensagem: 'Usuario criado com sucesso!',
				dados: new ListaTenantDTO(tenantCriado.slug, tenantCriado.nome, tenantCriado.corPrincipal),
			};
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	@UseGuards(AuthGuard)
	@Get()
	async buscaTodosTenants() {
		try {
			const tenants = await this.tenantService.buscaTodosTenants();

			return tenants;
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	@Get('/:slug')
	async buscaTenantPorSlug(@Param('slug') slug: string) {
		try {
			const tenantProcurado = await this.tenantService.buscaTenantPorSlug(slug);

			if (tenantProcurado == null) {
				return {
					status: HttpStatus.NOT_FOUND,
					mensagem: 'Tenant não encontrado!',
				};
			}

			return {
				dados: new ListaTenantDTO(tenantProcurado.slug, tenantProcurado.nome, tenantProcurado.corPrincipal),
			};
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}
}
