import { Injectable, PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashearSenhaPipe implements PipeTransform {
	constructor(private configService: ConfigService) {}

	async transform(senha: string) {
		const SECRET_KEY = this.configService.get<string>('SECRET_KEY');

		const senhaHasheada = await bcrypt.hash(senha, SECRET_KEY!);

		return senhaHasheada;
	}
}
