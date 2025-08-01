/**
 * Manager responsible for verifying whether channels are live on Twitch or Kick.
 * Handles external API requests and abstracts platform-specific logic.
 */
export class ChannelManager {
  /**
   * Checks whether a Kick.com channel is currently live.
   * @param channel The Kick channel name (slug).
   * @returns True if the channel is live, otherwise false.
   */
  async verifyKickLive(channel: string): Promise<boolean> {
    try {
      const response = await fetch(`https://kick.com/api/v1/channels/${channel}`);
      if (!response.ok) {
        throw new Error(`Kick API responded with status ${response.status}`);
      }

      const data: {
        livestream: {
          is_live: boolean;
        } | null;
      } = await response.json();

      return data.livestream?.is_live ?? false;
    } catch (error) {
      console.error(`[Kick] Error verifying live status for "${channel}":`, error);
      return false;
    }
  }

  /**
   * Checks whether a Twitch channel is currently live using the Twitch Helix API.
   * @param channel The Twitch username (login).
   * @returns True if the channel is live, otherwise false.
   */
  async verifyTwitchLive(channel: string): Promise<boolean> {
    try {
      const tokenResponse = await fetch('https://id.twitch.tv/oauth2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: process.env.TWITCH_CLIENT_ID ?? '',
          client_secret: process.env.TWITCH_CLIENT_SECRET ?? '',
          grant_type: 'client_credentials',
        }).toString(),
      });

      if (!tokenResponse.ok) {
        throw new Error(`Failed to obtain Twitch OAuth token (status ${tokenResponse.status})`);
      }

      const authData: {
        access_token: string;
        expires_in: number;
        token_type: string;
      } = await tokenResponse.json();

      const accessToken = authData.access_token;

      const streamResponse = await fetch(
        `https://api.twitch.tv/helix/streams?user_login=${channel}`,
        {
          headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID ?? '',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!streamResponse.ok) {
        throw new Error(`Twitch API error (status ${streamResponse.status}) for channel ${channel}`);
      }

      const data: {
        data: Array<any>;
      } = await streamResponse.json();

      return data.data.length > 0;
    } catch (error) {
      console.error(`[Twitch] Error verifying live status for "${channel}":`, error);
      return false;
    }
  }
}
