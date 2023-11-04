import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { PayloadInterface } from './auth.service';
import { JwtService } from '@nestjs/jwt';

export interface RequisicaoComUsuario extends Request {
	usuario: PayloadInterface;
}

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private jwtService: JwtService) {}

	//Verifica se a requisição pode ser acessada pelo requisitor
	async canActivate(contexto: ExecutionContext): Promise<boolean> {
		const requisicao = contexto
			.switchToHttp()
			.getRequest<RequisicaoComUsuario>();

		const token = this.extraiTokenDaCabecalho(requisicao);

		if (!token) {
			throw new UnauthorizedException('Token não encontrado!');
		}

		try {
			//Verifica a autenticidade do Token
			const payload: PayloadInterface =
				await this.jwtService.verifyAsync(token);

			//console.log('O PayLoad é: ' + JSON.stringify(payload));

			//Adiciona o payload ao corpo da requisição
			requisicao.usuario = payload;

      
		} catch (error) {
			console.error(error);
			throw new UnauthorizedException('Token inválido!');
		}

		return true;
	}

	//Extrai o token do cabeçalho da requisição
	private extraiTokenDaCabecalho(requisicao: Request): string | null {
		//Formato: "Bearer <TOKEN JWT>:"

		//Verifica se existe o cabeçalho de autorização
		if (!requisicao.headers.authorization) {
			return null;
		}

		// [tipo - token] -> Split separa as partes do cabeçalho
		const partes = requisicao.headers.authorization.split(' ');

		if (partes.length !== 2) {
			return null;
		}

		const [esquema, token] = partes;

		if (!/^Bearer$/i.test(esquema)) {
			return null;
		}

		console.log(token);
		return token;
	}
}
