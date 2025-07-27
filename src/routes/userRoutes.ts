import { Router } from 'express';
import { UserController } from '../usecases/user/UserController';
import { UserSettingsController } from '../usecases//user/settings/UserSettingsController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const controller = new UserController();
const userSettingsController = new UserSettingsController();

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Retrieve authenticated user and their settings
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User and settings fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWithSettings'
 *       401:
 *         description: Unauthorized – missing or invalid token
 */
router.get('/me', authMiddleware, controller.getMe);

router.get('/me', authMiddleware, controller.getMe);

/**
 * @swagger
 * /api/users/me:
 *   put:
 *     summary: Update authenticated user’s profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Bad request – invalid payload
 *       401:
 *         description: Unauthorized – missing or invalid token
 */
router.put('/me', authMiddleware, controller.updateMe);

/**
 * @swagger
 * /api/users/me/settings:
 *   put:
 *     summary: Update settings for the authenticated user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSettingsRequest'
 *     responses:
 *       200:
 *         description: User settings updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SettingsResponse'
 *       400:
 *         description: Bad request – invalid payload
 *       401:
 *         description: Unauthorized – missing or invalid token
 */
router.put('/me/settings', authMiddleware, userSettingsController.updateOwnSettings);


/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Retrieve user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the user to retrieve
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       404:
 *         description: User not found
 */
router.get('/:id', controller.getById);

export { router as userRoutes };
