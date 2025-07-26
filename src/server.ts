// 🌍 Node & core modules
import dotenv from 'dotenv';

// 📦 Third-party libraries
import express from 'express';
import cors from 'cors';

// 🧩 Internal modules
import { authRoutes } from './routes/authRoutes';
import { setupSwagger } from './config/swagger';
import { errorHandler } from './middlewares/errorHandler';

// ✅ Carrega variáveis do .env
dotenv.config();

// 🚀 Inicializa o app Express
const app = express();

// 🛡️ Middlewares globais
app.use(cors()); // Libera CORS
app.use(express.json()); // Habilita JSON no corpo da requisição

// 📦 Rotas
app.use('/api/auth', authRoutes);

// 📄 Documentação Swagger
setupSwagger(app);

// ❌ Middleware global para tratamento de erros
app.use(errorHandler);

// 🔊 Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🟢 Server running at http://localhost:${PORT}`);
  console.log(`📚 Swagger docs at http://localhost:${PORT}/api/docs`);
});
