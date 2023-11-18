export class ListaItemDTO {
	constructor(
		readonly nome: string,
		readonly descricao: string,
		readonly imagem: string,
		readonly valor: Number,
		readonly tenant: string,
		readonly categoria: string,
	) {}
}
