import { Application } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import id from 'zod/v4/locales/id.cjs';

export function setupSwagger(app: Application) {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Global Streaming API',
        version: '1.0.0',
        description:
          'Backend do Global Streaming — autenticação, usuários, configurações e chat unificado.',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
        schemas: {
          // A sanitized user (no password)
          UserResponse: {
            type: 'object',
            properties: {
              id: { type: 'integer', example: 1 },
              name: { type: 'string', example: 'John Doe' },
              email: { type: 'string', example: 'john@example.com' },
            },
            required: ['id', 'name', 'email'],
          },

          // A settings object
          SettingsResponse: {
            type: 'object',
            properties: {
              id: { type: 'integer', example: 1 },
              userId: { type: 'integer', example: 1 },
              twitchChannel: { type: 'string', example: 'my_twitch' },
              kickChannel: { type: 'string', example: 'my_kick' },
            },
            required: ['id', 'userId', 'twitchChannel', 'kickChannel'],
          },

          // Wrapped user + settings
            UserWithSettings: {
            type: 'object',
            properties: {
              user: { $ref: '#/components/schemas/UserResponse' },
              settings: {
              oneOf: [
                { $ref: '#/components/schemas/SettingsResponse' },
                { type: 'null' },
              ],
              },
            },
            required: ['user'],
            },

          // Request payload for updating user
          UpdateUserRequest: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              email: { type: 'string' },
              password: { type: 'string' },
            },
            required: ['name', 'email'],
          },

          // Request payload for updating settings
          UpdateSettingsRequest: {
            type: 'object',
            properties: {
              userId: { type: 'integer', example: 1 },
              twitch_channel: { type: 'string', example: 'my_twitch' },
              kick_channel: { type: 'string', example: 'my_kick' },
            },
            required: ['userId', 'twitch_channel', 'kick_channel'],
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
    // point swagger-jsdoc at your route files:
    apis: ['./src/routes/*.ts', './src/usecases/**/*.ts'],
  };

  const specs = swaggerJsdoc(options);
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
}
