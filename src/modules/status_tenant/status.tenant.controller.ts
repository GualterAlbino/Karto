import {
	Controller,
	Get,
	Post,
	Body,
	HttpException,
	HttpStatus,
	UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { CriaStatusTenantDTO } from './dto/cria-status-tenant.dto';
import { StatusTenantService } from './status.tenant.service';
import { ListaStatusTenantDTO } from './dto/lista-status-tenant.dto';

@ApiTags('Status Tenant')
@Controller('status-tenant')
export class StatusTenantController {
	constructor(private readonly statusTenantService: StatusTenantService) {}

	@UseGuards(AuthGuard)
	@Post()
	async criarStatusTenant(
		@Body() { ...dadosDoStatusTenant }: CriaStatusTenantDTO, //Descarto a senha sem o HASH
	) {
		try {
			const statusTenantCriado =
				await this.statusTenantService.criarStatusTenant({
					...dadosDoStatusTenant,
				});

			return {
				mensagem: 'Status criado com sucesso!',
				dados: new ListaStatusTenantDTO(statusTenantCriado.descricao),
			};
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	@UseGuards(AuthGuard)
	@Get()
	async buscaTodosStatusTenants() {
		try {
			const tenants = await this.statusTenantService.buscaTodosStatusTenants();

			return tenants;
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}
}
