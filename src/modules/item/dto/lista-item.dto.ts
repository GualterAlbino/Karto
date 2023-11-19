export class ListaItemDTO {
	constructor(
		readonly nome: string,
		readonly descricao: string,
		readonly imagem: string,
		readonly valor: Number,
		readonly tenantId: string,
		readonly categoriaId: string,
	) {}
}
