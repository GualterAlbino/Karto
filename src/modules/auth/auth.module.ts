import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from '../usuario/usuario.module';
import { TenantModule } from '../tenant/tenant.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [
		UsuarioModule,
		TenantModule,
		JwtModule.register({//Configurações do JWT
			global: true,
			secret: 'PonteiroMisterio',
			signOptions: { expiresIn: '1h' },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
