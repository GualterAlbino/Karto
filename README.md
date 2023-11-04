<div align="center">
  
 ## Karto
  
</div>

## 📁 Informações do projeto:

- O projeto se trata de uma aplicação `multi-tenancy`, ou seja, a aplicação foi projetada para servir múltiplos clientes, também chamados de "inquilinos" ou "tenants", de forma isolada em um único sistema compartilhado. Cada inquilino em uma aplicação multi-tenancy geralmente opera como se tivesse sua própria instância privada da aplicação, com seus próprios dados, configurações e, em muitos casos, sua própria experiência personalizada.

<br>

- O projeto tem como objetivo servir como expositor de produtos aos estabelecimentos(tenants) com um catalogo de produtos que permite a realização de pedidos pelos usuarios finais (clientes dos estabelecimentos). A aplicação além de suportar diversos estabelecimentos também permite certo nivel de personalização da página de exibição de produtos de cada um.

<br>

- Cada estabelecimento (tenant) pode cadastrar produtos a serem exibidos, bem como editar e excluir. Além disso o cliente final pode realizar os pedidos pela prorpia plataforma informando os itens e a forma de pagamento.
  _Obs:_ A realização das transações de pagamento não ocorrem na plataforma, o objetivo da aplicação é servir como um canal de exposição e pedidos de produtos.

<hr>

## ✔️ Requisitos para utilização do projeto:

- Possuir o Docker Desktop instalado e devidamente configurado
- Possuir alguma Application Programming Interfaces, preferencialmente o POSTMAN devido as collections que acompanham os arquivos do projeto

<hr>

## ▶️ Utilização do projeto:

- Para utilização do projeto deve-se seguir os seguintes passos:

1. Após clonar o repositorio e abrir na IDE execute os comandos:

2. `docker-compose up -d` para subir o container e iniciar os serviços. O container foi divido em três serviços,sendo eles:

- Aplicação
- Banco de Dados
- pgAdmin (SBD)

3. Feito isso, será necessario que acesse o pgAdmin (SBD escolhido) no proprio navegador pelo link: `http://localhost:8081/browser/`

4. Ao acessar, deverá informar as credenciais de acesso ao painel administrativo:

5. email: `gualter@email.com` senha: `postgres`
   _Obs:_ Essa e outras informações de conexão estão disponiveis no arquivo _.env_ que está público propositalmente.

6. Ao acessar, deve clicar em ADICIONAR NOVO SERVIDOR. A seguir os passos:

7. Aba Geral - Nome: `postgres`

8. Aba Conexão - Host: `database`, Port:`5432`, Username: `postgres`, Password: `postgres`

9. Ao clicar em salvar, se todos os dados estiverem corretos você conseguirá conectar com sucesso.

Após realizar esses passos,a API estará em execução e será possivel realizar as requisições.

<hr>

## ⚙️ Linguagem e Tecnologias utilizadas

- `Typescript`
- `NestJS`
- `TypeORM`
- `JWT`
- `Swagger`
- `Postgres`
- `Docker`

<hr>

## ⚙️ Modelo Entidade Relacionamento(DER):

<div align="center">
  
![ModeloDoBanco](./documents/DER/ModeloDoBanco.png)

</div>
<hr>
<br>

## 🧭 Contrato de rotas da API:

- As rotas se encontram documentadas pelo Swagger no link: `http://localhost:3000/api#/`

<div align="center">
  
![Arquivo contendo as rotas (Contrato)](./documents/Contrato-API/Contrato_Postman_2.1_collection)

</div>
