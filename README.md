# 🍔 Dev-burguer

Aplicação Full Stack inspirada em um sistema de pedidos online, simulando a estrutura base de um e-commerce.

O projeto foi desenvolvido com foco em autenticação segura, organização de código, integração entre front-end e back-end e modelagem relacional de banco de dados.

---

## 🚀 Tecnologias Utilizadas

### 🔹 Back-end
- Node.js
- Express
- Sequelize
- PostgreSQL
- JWT (Autenticação)
- Bcrypt
- Multer
- Yup
- Docker

### 🔹 Front-end (Em andamento)*
- React
- JavaScript (ES6+)
- Axios
- CSS

---

## 🏗️ Arquitetura do Projeto

A aplicação segue um padrão organizado por responsabilidades:

- Controllers
- Models
- Middlewares
- Rotas protegidas por autenticação
- Validação de dados
- Tratamento de erros centralizado

O sistema utiliza autenticação via JWT, garantindo que cada usuário tenha acesso apenas aos seus próprios pedidos e informações.

---

## 🔐 Funcionalidades

### 👤 Usuário
- Cadastro
- Login com geração de token
- Autenticação protegendo rotas privadas

### 🍔 Produtos
- Cadastro de produtos
- Upload de imagem
- Listagem de produtos
- Associação por categoria

### 🛒 Pedidos
- Criação de pedido
- Associação do pedido ao usuário
- Estrutura preparada para expansão de fluxo de checkout

---

## 🔄 Fluxo da Aplicação

1. Usuário cria conta
2. Sistema armazena senha criptografada
3. Login gera Token JWT
4. Token protege rotas privadas
5. Usuário pode visualizar produtos e realizar pedidos

---

## 🗄️ Modelagem do Banco

Relacionamentos:

- Um usuário possui vários pedidos
- Um pedido possui vários produtos
- Um produto pertence a uma categoria

Banco relacional utilizando PostgreSQL com Sequelize ORM.

---

## 🧪 Testes

- Testes via Insomnia/Postman
- Validação de autenticação inválida
- Testes de upload de imagens
- Testes de rotas protegidas

---

## 🐳 Execução com Docker

```bash
docker-compose up --build
