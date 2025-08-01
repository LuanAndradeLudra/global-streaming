import { Request, Response } from 'express';
import { ChannelManager } from './ChannelManager';

/**
 * Controller responsible for handling channel status-related HTTP requests.
 */
export class ChannelController {
  private manager = new ChannelManager();

  /**
   * GET /api/channel/verifylive/:type/:channel
   * Verifies if a specific channel is currently live on Twitch or Kick.
   *
   * @param req Express Request
   * @param res Express Response
   * @returns JSON response indicating whether the channel is live
   */
  verifyLive = async (req: Request, res: Response): Promise<Response> => {
    const { type, channel } = req.params;

    if (!type?.trim() || !channel?.trim()) {
      return res.status(400).json({ error: 'Type and channel parameters are required.' });
    }

    switch (type.toLowerCase()) {
      case 'twitch': {
        const isLive = await this.manager.verifyTwitchLive(channel);
        return res.json({ live: isLive });
      }

      case 'kick': {
        const isLive = await this.manager.verifyKickLive(channel);
        return res.json({ live: isLive });
      }

      default:
        return res.status(400).json({ error: 'Unsupported channel type.' });
    }
  };
}
