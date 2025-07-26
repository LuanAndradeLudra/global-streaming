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