export class ListaTenantDTO {
	constructor(
		readonly id: string,
		readonly slug: string,
		readonly nome: string,
		readonly corPrincipal: string,
	) {}
}
