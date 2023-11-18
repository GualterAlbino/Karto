import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AutenticaDTO } from './dto/autentica.dto';

@Controller('Auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login/usuario')
	loginUsuario(@Body() { email, senha }: AutenticaDTO) {
		return this.authService.loginUsuario(email, senha);
	}

	@Post('login/tenant')
	loginTenant(@Body() { email, senha }: AutenticaDTO) {
		return this.authService.loginTenant(email, senha);
	}
}
