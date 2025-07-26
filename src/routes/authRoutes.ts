import { Router } from 'express';
import { AuthController } from '../usecases/auth/AuthController';
import { validate } from '../middlewares/validate';
import { LoginUserSchema } from '../infra/validators/loginUserValidator';
import { RegisterUserSchema } from '../infra/validators/registerUserValidator';

export const authRoutes = Router();
const controller = new AuthController();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Dados inválidos
 */
authRoutes.post('/login', validate(LoginUserSchema), controller.login);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza o login de um usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: email@email.com
 *               password:
 *                 type: string
 *                 example: suaSenha123
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: jwt.token.aqui
 *       401:
 *         description: Credenciais inválidas
 */
authRoutes.post('/register', validate(RegisterUserSchema), controller.register);
