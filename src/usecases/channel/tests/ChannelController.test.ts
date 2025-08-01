import { Request, Response } from 'express';
import { ChannelController } from '../ChannelController';
import { ChannelManager } from '../ChannelManager';

jest.mock('../ChannelManager'); // Mocka a classe inteira

describe('ChannelController', () => {
  let controller: ChannelController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    controller = new ChannelController();

    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    mockRequest = {
      params: {},
    };
    mockResponse = {
      json: jsonMock,
      status: statusMock,
    };

    jest.clearAllMocks();
  });

  it('should return 400 if type or channel is missing', async () => {
    await controller.verifyLive(mockRequest as Request, mockResponse as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ error: 'Type and channel parameters are required.' });
  });

  it('should return twitch live status', async () => {
    mockRequest.params = { type: 'twitch', channel: 'streamer' };
    const mockManager = controller['manager'] as jest.Mocked<ChannelManager>;
    mockManager.verifyTwitchLive = jest.fn().mockResolvedValue(true);

    await controller.verifyLive(mockRequest as Request, mockResponse as Response);

    expect(mockManager.verifyTwitchLive).toHaveBeenCalledWith('streamer');
    expect(jsonMock).toHaveBeenCalledWith({ live: true });
  });

  it('should return kick live status', async () => {
    mockRequest.params = { type: 'kick', channel: 'kickguy' };
    const mockManager = controller['manager'] as jest.Mocked<ChannelManager>;
    mockManager.verifyKickLive = jest.fn().mockResolvedValue(false);

    await controller.verifyLive(mockRequest as Request, mockResponse as Response);

    expect(mockManager.verifyKickLive).toHaveBeenCalledWith('kickguy');
    expect(jsonMock).toHaveBeenCalledWith({ live: false });
  });

  it('should return 400 for unsupported type', async () => {
    mockRequest.params = { type: 'youtube', channel: 'someone' };

    await controller.verifyLive(mockRequest as Request, mockResponse as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ error: 'Unsupported channel type.' });
  });
});
