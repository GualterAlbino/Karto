export class ListaTenantDTO {
	constructor(
		readonly slug: string,
		readonly nome: string,
		readonly corPrincipal: string,
	) {}
}
