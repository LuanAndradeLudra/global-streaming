# Global Streaming - Backend

Backend do projeto **Global Streaming**, responsável por autenticação de usuários, configuração de canais (Twitch/Kick) e futura lógica de sorteios baseada em mensagens de chat unificado.

---

## ✅ Requisitos

- Node.js v18+
- MariaDB instalado e em execução (localhost:3306)
- Prisma ORM (instalado via dependência)
- Yarn ou npm

---

## ⚙️ Configuração do ambiente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/global-streaming-backend.git
cd global-streaming-backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Crie o banco no MariaDB

Abra o terminal do MariaDB ou cliente gráfico e execute:

```sql
CREATE DATABASE global_streaming;
```

> Crie um usuário se desejar:
> ```sql
> CREATE USER 'gs_user'@'localhost' IDENTIFIED BY 'senha123';
> GRANT ALL PRIVILEGES ON global_streaming.* TO 'gs_user'@'localhost';
> ```

### 4. Configure o `.env`

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Edite `.env`:

```env
DATABASE_URL="mysql://user:senha@localhost:3306/global_streaming"
JWT_SECRET="uma-senha-secreta-jwt"
```

> ❗ Atenção: se sua senha tiver caracteres especiais (`?`, `&`, `@`, etc), você deve **escapá-los** com percent-encoding:
> - `?` → `%3F`
> - `@` → `%40`

Exemplo:
```env
DATABASE_URL="mysql://root:minhaSenha%3F@localhost:3306/global_streaming"
```

### 5. Inicializar as migrations

```bash
rm -rf prisma/migrations
rm prisma/migration_lock.toml
```

Agora aplique as migrations:

```bash
npm run migrate
```

### 6. Gere o client do Prisma

```bash
npm run generate
```

### 7. Rode o servidor de desenvolvimento

```bash
npm run dev
```

---

## 🔄 Scripts disponíveis

```bash
npm run dev         # Inicia o servidor com ts-node-dev
npm run build       # Compila o código TypeScript para ./dist
npm run start       # Executa ./dist/server.js
npm run migrate     # Aplica as migrations
npm run generate    # Gera o client do Prisma
npm run lint        # Roda o ESLint (configurado)
npm run format      # Roda o Prettier
npm run prepare     # Instala hooks do Husky
```

---

## ✍️ Padronização de Commits

Este projeto utiliza **Commitizen + Commitlint + Husky** para padronizar mensagens de commit.

### Setup automático:

- `commitlint.config.js` define a regra como `@commitlint/config-conventional`
- Husky está ativado com o hook `prepare`
- Para realizar commits com prompt interativo, use:

```bash
npx cz
```

Exemplo de commit gerado:

```
feat: adiciona autenticação de usuário via JWT
```

---

## 📚 Documentação da API (Swagger)

Após rodar o servidor, acesse:

[http://localhost:3000/api/docs](http://localhost:3000/api/docs)

A documentação Swagger será gerada automaticamente com base nos comentários JSDoc.

---

## 📚 Licença

MIT

---

# Global Streaming Auth API

Uma API de autenticação e gerenciamento de usuários construída com Node.js, Express, TypeScript e Prisma, seguindo os princípios SOLID e arquitetura limpa.

---

## 🧱 Tecnologias e Stack

- **Node.js + Express**
- **TypeScript**
- **Prisma + PostgreSQL/MariaDB**
- **Zod** para validação de schemas
- **Jest** para testes unitários
- **Swagger** para documentação da API
- **Arquitetura limpa** com separação de:
  - UseCases (Managers)
  - Controllers
  - Repositories
  - DTOs
  - Validators

---

## 🚀 Funcionalidades

- Registro e login de usuários com retorno de JWT
- Criptografia de senha com `bcrypt`
- Validações de entrada com mensagens personalizadas (Zod)
- Documentação automática com Swagger
- Cobertura de testes 100% em:
  - Regras de negócio (`AuthManager`, `UserManager`)
  - Repositórios (`UserRepository`)
  - Singleton Prisma
  - Tratamento de erros (`AppError`)
- Testes com fakes manuais e mocks, sem injeção de dependência forçada
- Padronização de mensagens de erro com middleware global

---

## 🗂️ Estrutura do Projeto

```bash
src/
├── app.ts                  # Configuração e bootstrap
├── server.ts               # Inicialização do servidor
├── config/                 # Configurações externas (Swagger)
├── core/
│   ├── dto/                # DTOs reais (sem validações)
│   │   ├── auth/
│   │   └── user/
│   ├── errors/             # AppError
│   └── interfaces/         # Interfaces para Managers e Repositories
├── domain/                 # (Futuro uso para entidades e regras puras)
├── infra/
│   ├── repositories/       # Implementação dos Repositories
│   ├── services/           # Serviços externos (futuro)
│   └── validators/         # Schemas Zod para validação
├── lib/
│   └── prisma.ts           # Singleton do Prisma Client
├── middlewares/            # Error handler, validate
├── routes/                 # Definição de rotas
├── usecases/
│   ├── auth/               # Lógica de autenticação
│   └── user/               # Lógica de usuário
```

---

## 📄 Endpoints

Documentação Swagger disponível em:

```
http://localhost:3000/api/docs
```

Endpoints principais:

- `POST /api/users/register`
- `POST /api/users/login`

---

## 🧪 Testes

Executar todos os testes:

```bash
npm test
```

Cobertura:

```bash
npm run test:coverage
```

---

## 🧰 Scripts

```json
"scripts": {
  "dev": "ts-node-dev src/server.ts",
  "start": "node build/server.js",
  "build": "tsc",
  "test": "jest",
  "test:coverage": "jest --coverage"
}
```

---

## 📦 Requisitos

- Node.js 18+
- Banco de dados: PostgreSQL ou MariaDB
- `.env` com:

```
DATABASE_URL="sua_string_de_conexao"
JWT_SECRET="chave_secreta"
```

---

## 📝 Postman Collection

Uma collection Postman está disponível no projeto com:

- Variáveis de ambiente (`{{url}}`, `{{email}}`, etc)
- Exemplos de login e registro com corpo válido e inválido

---

## ✅ TODO Futuro

- Rotas protegidas
- Refresh token
- Logout e revogação
- Recuperação de senha
- Roles e permissões

---

## 📣 Autor

Feito com 💻 por **Luan Andrade**