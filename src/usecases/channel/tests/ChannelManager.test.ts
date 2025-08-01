import { ChannelManager } from '../ChannelManager';

describe('ChannelManager', () => {
  let manager: ChannelManager;

  beforeEach(() => {
    manager = new ChannelManager();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('verifyKickLive', () => {
    it('should return true if Kick channel is live', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          livestream: { is_live: true },
        }),
      });

      const result = await manager.verifyKickLive('kickchannel');
      expect(result).toBe(true);
      expect(fetch).toHaveBeenCalledWith('https://kick.com/api/v1/channels/kickchannel');
    });

    it('should return false if Kick channel is not live', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          livestream: { is_live: false },
        }),
      });

      const result = await manager.verifyKickLive('kickchannel');
      expect(result).toBe(false);
    });

    it('should return false if Kick channel livestream is null', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          livestream: null,
        }),
      });

      const result = await manager.verifyKickLive('kickchannel');
      expect(result).toBe(false);
    });

    it('should return false if Kick API call fails', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const result = await manager.verifyKickLive('kickchannel');
      expect(result).toBe(false);
    });
  });

  describe('verifyTwitchLive', () => {
    it('should return true if Twitch channel is live', async () => {
      (fetch as jest.Mock)
        // Auth token response
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            access_token: 'test_token',
            expires_in: 3600,
            token_type: 'bearer',
          }),
        })
        // Stream status response
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            data: [{ id: '123', user_name: 'twitchchannel' }],
          }),
        });

      const result = await manager.verifyTwitchLive('twitchchannel');
      expect(result).toBe(true);
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    it('should return false if Twitch channel is not live', async () => {
      (fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            access_token: 'test_token',
            expires_in: 3600,
            token_type: 'bearer',
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            data: [],
          }),
        });

      const result = await manager.verifyTwitchLive('twitchchannel');
      expect(result).toBe(false);
    });

    it('should return false if Twitch token request fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
      });

      const result = await manager.verifyTwitchLive('twitchchannel');
      expect(result).toBe(false);
    });

    it('should return false if Twitch stream request fails', async () => {
      (fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            access_token: 'test_token',
            expires_in: 3600,
            token_type: 'bearer',
          }),
        })
        .mockResolvedValueOnce({
          ok: false,
          status: 500,
        });

      const result = await manager.verifyTwitchLive('twitchchannel');
      expect(result).toBe(false);
    });

    it('should return false on unexpected error', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Unexpected'));

      const result = await manager.verifyTwitchLive('twitchchannel');
      expect(result).toBe(false);
    });
  });

  it('should return false if Kick API responds with error status', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 503,
    });

    const result = await manager.verifyKickLive('kickchannel');
    expect(result).toBe(false);
    expect(fetch).toHaveBeenCalledWith('https://kick.com/api/v1/channels/kickchannel');
  });
});
