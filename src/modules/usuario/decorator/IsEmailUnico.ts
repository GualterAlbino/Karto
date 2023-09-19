import {
	ValidatorConstraintInterface,
	ValidationArguments,
	ValidatorConstraint,
	ValidationOptions,
	registerDecorator,
} from 'class-validator';
import { UsuarioService } from '../usuario.service';
import { Injectable } from '@nestjs/common';
import { register } from 'module';

@Injectable() //Provider
@ValidatorConstraint({ async: true }) //Determina que é um validador assíncrono
export class IsEmailUnico implements ValidatorConstraintInterface {
	constructor(private usuarioService: UsuarioService) {}

	/**
	 * @param email
	 * @param args
	 *
	 * Se retornar TRUE, a validação passou
	 * Se retornar FALSE, a validação falhou
	 */
	async validate(email: string, args?: ValidationArguments): Promise<boolean> {
		const emailExiste = await this.usuarioService.buscaUsuarioPorEmail(email);
		return !emailExiste;
	}

	defaultMessage(args: ValidationArguments) {
		return 'O email $value já está cadastrado!';
	}
}

//Exporta esse nosso "Decorator" personalizado que é ASSINCRONO e podemos usar ele no DTO
export const EmailUnico = (opcoesDeValidacao: ValidationOptions) => {
	return (objeto: object, propriedade: string) =>
		registerDecorator({
			target: objeto.constructor,
			propertyName: propriedade,
			options: opcoesDeValidacao,
			constraints: [],
			validator: IsEmailUnico,
		});
};
