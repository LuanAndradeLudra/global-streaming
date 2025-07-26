// 🌍 Node & core modules
import dotenv from 'dotenv';

// 📦 Third-party libraries
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// 🧩 Internal modules
import { authRoutes } from './routes/authRoutes';
import { setupSwagger } from './config/swagger';
import { errorHandler } from './middlewares/errorHandler';

// ✅ Carrega variáveis do .env
dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';

// 🚀 Inicializa o app Express
const app = express();

// 🛡️ Middlewares globais
app.use(cors()); // Libera CORS
app.use(express.json()); // Habilita JSON no corpo da requisição

// Segurança HTTP
if (isProduction) {
  console.log('🔒 Aplicação rodando em produção, aplicando medidas de segurança...');
  app.use(helmet());

  // Limite de requisições
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Máx. 100 requisições por IP
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again later.',
  });
  app.use(limiter);
}

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
