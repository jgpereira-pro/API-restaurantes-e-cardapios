# 🍽️ API de Gestão de Restaurantes e Cardápios

## 💻 Sobre o Projeto
Esta é uma API RESTful robusta desenvolvida para o gerenciamento completo de restaurantes, suas categorias e itens de cardápio. O sistema também conta com um módulo de autenticação e autorização para garantir que apenas usuários permitidos possam manipular os dados dos estabelecimentos.

O grande diferencial deste projeto é a sua **Arquitetura em Camadas**, aplicando o *Repository Pattern* para separar claramente a lógica de negócio do acesso a dados, resultando em um código limpo, testável e de fácil manutenção.

## 🚀 Tecnologias Utilizadas
*   **Node.js & TypeScript** - Para um desenvolvimento tipado e seguro.
*   **Fastify** (Ex: Express ou Fastify) - Para o roteamento e criação da API.
*   **Prisma ORM** - Para a modelagem do banco de dados e execução de *migrations*.
*   **MySQL** (Ex: PostgreSQL ou MySQL) - Banco de dados relacional escolhido para a persistência.
*   **Jest** - Framework de testes configurado para garantir a confiabilidade da aplicação.
*   **Zod** (Ex: Zod ou Yup) - Para validação de schemas de entrada de dados.

## 🛠️ Funcionalidades
A API oferece suporte às seguintes operações:
*   **Autenticação (`/auth`):** Login e geração de tokens de acesso de forma segura.
*   **Gestão de Restaurantes (`/restaurantes`):** CRUD completo para o cadastro e manutenção de restaurantes.
*   **Gestão de Categorias (`/categorias`):** Criação e organização de categorias para os cardápios.
*   **Gestão de Itens (`/itens`):** CRUD de produtos/pratos vinculados aos restaurantes e suas respectivas categorias.
*   **Validação de Dados:** As requisições passam por validações estritas (`AuthSchema`, `CardapioSchema`, `RestauranteSchema`) antes de chegarem aos *controllers*.

## ⚙️ Arquitetura e Estrutura de Pastas
O projeto foi desenhado com foco em *Clean Code* e separação de responsabilidades (N-Tier Architecture):

*   `prisma/` - Contém o esquema de modelagem do banco (`schema.prisma`) e o histórico de *migrations* em SQL.
*   `src/routes/` - Definição dos *endpoints* da API.
*   `src/middlewares/` - Interceptadores, como o `authMiddleware`, para proteção de rotas.
*   `src/controllers/` - Responsáveis por receber a requisição HTTP e devolver a resposta.
*   `src/services/` - Onde reside o "coração" da aplicação: todas as regras de negócio.
*   `src/repositories/` - Camada exclusiva para comunicação com o banco de dados através do Prisma.
*   `src/schemas/` - Arquivos de validação do formato (payload) das requisições.
*   `tests/` - Diretório destinado aos testes automatizados da aplicação.

## 🏁 Como Executar o Projeto

**Pré-requisitos:** [Node.js](https://nodejs.org/) instalado e uma instância do seu banco de dados rodando.

1.Clone o repositório:

git clone [https://github.com/SEU-USUARIO/](https://github.com/SEU-USUARIO/)[NOME-DO-REPOSITORIO].git

2.Acesse a pasta do projeto:

cd [NOME-DO-REPOSITORIO]

3.Instale as dependências:

npm install
# ou yarn install / pnpm install

4.Configure as variáveis de ambiente:

Crie um arquivo .env na raiz do projeto e adicione a string de conexão do seu banco de dados (ex: DATABASE_URL).

5.Execute as migrations do Prisma para criar as tabelas:

npx prisma migrate dev

6.Inicie a aplicação:

npm run dev
