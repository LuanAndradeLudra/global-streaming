import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { ChannelController } from '../usecases/channel/ChannelController';
import { VerifyLiveParamsSchema } from '../infra/validators/VerifyLiveParamsSchema';
import { validate } from '../middlewares/validate';
import { validateParams } from '../middlewares/validateParams';

const router = Router();
const controller = new ChannelController();

/**
 * @swagger
 * /api/channel/verifylive/{type}/{channel}:
 *   get:
 *     summary: Check if a given channel is currently live
 *     tags: [Channel]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [twitch, kick]
 *         description: Platform type
 *       - in: path
 *         name: channel
 *         required: true
 *         schema:
 *           type: string
 *         description: Channel name or slug
 *     responses:
 *       200:
 *         description: Live status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 live:
 *                   type: boolean
 *       400:
 *         description: Invalid parameters
 *       401:
 *         description: Unauthorized – missing or invalid token
 */
router.get(
  '/verifylive/:type/:channel',
  authMiddleware,
  validateParams(VerifyLiveParamsSchema),
  controller.verifyLive
);

export { router as channelRoutes };
