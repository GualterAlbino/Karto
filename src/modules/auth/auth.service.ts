import { Injectable } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { TenantService } from '../tenant/tenant.service';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

interface PayloadInterface {
	sub: string;
	email: string;
}

@Injectable()
export class AuthService {
	constructor(
		private readonly usuarioService: UsuarioService,
		private readonly tenantService: TenantService,
		private readonly jwtService: JwtService,
	) {}

	async loginUsuario(emailRecebido: string, senhaRecebida: string) {
		const usuario =
			await this.usuarioService.buscaUsuarioPorEmail(emailRecebido);

		if (!usuario) {
			throw new UnauthorizedException('Usuário ou senha inválidos!');
		}

		const usuarioAutenticado = await bcrypt.compare(
			senhaRecebida,
			usuario.senha,
		);

		if (!usuarioAutenticado) {
			throw new UnauthorizedException('Usuário ou senha inválidos!');
		}

		const payload: PayloadInterface = {
			//- 1/3 do JWT
			sub: usuario.id, // subject = sujeito
			email: usuario.email,
		};

		return {
			//Cria e retorna o token de acesso
			token_acesso: await this.jwtService.signAsync(payload),
		};
	}

	async loginTenant(emailRecebido: string, senhaRecebida: string) {
		const tenant = await this.tenantService.buscaTenantPorEmail(emailRecebido);

		if (!tenant) {
			throw new UnauthorizedException('Usuário ou senha inválidos!');
		}

		const tenantAutenticado = await bcrypt.compare(senhaRecebida, tenant.senha);

		if (!tenantAutenticado) {
			throw new UnauthorizedException('Usuário ou senha inválidos!');
		}

		const payload: PayloadInterface = {
			//- 1/3 do JWT
			sub: tenant.id, // subject = sujeito
			email: tenant.email,
		};

		return {
			//Cria e retorna o token de acesso
			token_acesso: await this.jwtService.signAsync(payload),
		};
	}
}
