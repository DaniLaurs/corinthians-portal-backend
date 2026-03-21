# ⚽ Corinthians Portal API

API desenvolvida em Node.js para um portal de notícias do Corinthians.

## 🚀 Tecnologias usadas

- Node.js
- Express
- TypeScript
- MySQL
- JWT Authentication
- bcrypt
- CORS

## 📌 Funcionalidades

- Cadastro de usuários
- Login com autenticação JWT
- Controle de acesso para administrador
- CRUD de notícias
- Sistema de comentários nas notícias
- Paginação de notícias

## 🔐 Autenticação

A API utiliza **JWT (JSON Web Token)** para proteger rotas.

Rotas administrativas como:

- Criar notícia
- Deletar notícia
- Atualizar notícia

Só podem ser acessadas por **usuários administradores**.

## 📂 Estrutura do projeto
src
├ controllers
├ routes
├ middleware
├ config
└ server.ts


## ▶️ Como rodar o projeto

1️⃣ Clonar o repositório


git clone URL_DO_REPOSITORIO


2️⃣ Instalar dependências


npm install


3️⃣ Criar arquivo `.env`


PORT=3000
JWT_SECRET=seusecret
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=corinthians_portal


4️⃣ Rodar o servidor


npm run dev


## 🌐 Rotas principais

### Auth


POST /api/auth/signup
POST /api/auth/signin


### Notícias


GET /api/news
GET /api/news/:id
POST /api/news
DELETE /api/news/:id
PUT /api/news/:id


### Comentários


POST /api/comments
GET /api/comments/news/:newsId


## 👩‍💻 Desenvolvido por

Danielle Cristina Lauriano Sousa