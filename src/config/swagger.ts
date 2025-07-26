import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Global Streaming API',
    version: '1.0.0',
    description: 'Documentação da API para login e gerenciamento de canais',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
