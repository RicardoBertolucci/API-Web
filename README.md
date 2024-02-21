# API-Web\





# TechNipo - Backend

## Como executar localmente
Para rodar o backend do Technipo localmente, siga as etapas:
Observações: Como o projeto usa SQL server,

1. Clone o repositório
```
git clone https://github.com/RicardoBertolucci/API-Web.git
cd Davinti/API-Backend
```

2. Instale as dependencias e de um start na aplicação
```
npm install
npm run dev
```

3. Migrate das tabelas
```
  cd src
  npx sequelize db:migrate
``` 

### Padrão MVC
Utilizei o padrão MVC em nossa estrutura para uma melhor organização
MVC | Model View Controller

### Config
Pasta de configuração com o banco de dados PostgresSQL que utiliza com o node a biblioteca de conexão 'pg'


### Endpoints

A API expõe os seguintes *endpoints* a partir da *base URL* `localhost:3000`:

`/contacts`
* `GET /contacts - listAllContacts`
* `GET /contacts/:id - listContactById`
* `POST /contacts - createContact`
* `PUT /contacts/:id - updateContact`
* `DELETE /contacts/:id - deleteContact`

`/telephones`
* `GET /telephones - listAllTelephones`
* `GET /telephones/:id - listTelephoneById`
* `POST /telephones - createTelephone`
* `PUT /telephones/:id - updateTelephone`
* `DELETE /telephones/:id - deleteTelephone`


### Consulta aos bancos

Este projeto utiliza o SQL Server Express 2019 como gerenciador de banco de dados SQL.