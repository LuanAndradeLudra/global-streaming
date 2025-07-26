import { UserSettingsManager } from '../UserSettingsManager';
import { UserSettingsRepository } from '../../../../infra/repositories/user/settings/UserSettingsRepository';
import { UserSettings } from '@prisma/client';
import { UserSettingsDto } from '../../../../core/dto/user/settings/UserSettingsDto';
import { UpdateUserSettingsDto } from '../../../../core/dto/user/settings/UpdateUserSettingsDto';

describe('UserSettingsManager', () => {
  let manager: UserSettingsManager;
  let repo: jest.Mocked<UserSettingsRepository>;

  const sampleSettings: UserSettings = {
    id: 10,
    userId: 1,
    twitchChannel: 'twitch123',
    kickChannel: 'kick123',
  };

  beforeEach(() => {
    manager = new UserSettingsManager();
    // @ts-ignore
    repo = manager['repository'] = new UserSettingsRepository() as any;
  });

  it('should create settings', async () => {
    const dto: UserSettingsDto = {
      user_id: 1,
      twitch_channel: 'twitch123',
      kick_channel: 'kick123',
    };
    jest.spyOn(repo, 'create').mockResolvedValue(sampleSettings);

    const result = await manager.create(dto);
    expect(result).toEqual(sampleSettings);
    expect(repo.create).toHaveBeenCalledWith(dto);
  });

  it('should update settings by id', async () => {
    jest.spyOn(repo, 'update').mockResolvedValue(sampleSettings);

    const result = await manager.update(10, { twitchChannel: 'newT' });
    expect(result).toEqual(sampleSettings);
    expect(repo.update).toHaveBeenCalledWith(10, { twitchChannel: 'newT' });
  });

  it('should delete settings', async () => {
    const spy = jest.spyOn(repo, 'delete').mockResolvedValue();
    await manager.delete(10);
    expect(spy).toHaveBeenCalledWith(10);
  });

  it('should find by id', async () => {
    jest.spyOn(repo, 'findById').mockResolvedValue(sampleSettings);
    const result = await manager.findById(10);
    expect(result).toEqual(sampleSettings);
    expect(repo.findById).toHaveBeenCalledWith(10);
  });

  it('should find all settings', async () => {
    jest.spyOn(repo, 'findAll').mockResolvedValue([sampleSettings]);
    const result = await manager.findAll();
    expect(result).toEqual([sampleSettings]);
    expect(repo.findAll).toHaveBeenCalled();
  });

  it('should find by userId', async () => {
    jest.spyOn(repo, 'findByUserId').mockResolvedValue(sampleSettings);
    const result = await manager.findByUserId(1);
    expect(result).toEqual(sampleSettings);
    expect(repo.findByUserId).toHaveBeenCalledWith(1);
  });

  describe('upsertByUserId', () => {
    it('should update when exists', async () => {
      const dto: UpdateUserSettingsDto = { twitch_channel: 'upT', kick_channel: 'upK' };
      jest.spyOn(repo, 'findByUserId').mockResolvedValue(sampleSettings);
      jest.spyOn(repo, 'update').mockResolvedValue({
        ...sampleSettings,
        twitchChannel: 'upT',
        kickChannel: 'upK',
      });

      const result = await manager.upsertByUserId(1, dto);
      expect(repo.update).toHaveBeenCalledWith(10, {
        twitchChannel: 'upT',
        kickChannel: 'upK',
      });
      expect(result.twitchChannel).toBe('upT');
    });

    it('should create when not exists', async () => {
      const dto: UpdateUserSettingsDto = { twitch_channel: 'newT', kick_channel: 'newK' };
      jest.spyOn(repo, 'findByUserId').mockResolvedValue(null);
      jest.spyOn(repo, 'create').mockResolvedValue(sampleSettings);

      const result = await manager.upsertByUserId(1, dto);
      expect(repo.create).toHaveBeenCalledWith({
        user_id: 1,
        twitch_channel: 'newT',
        kick_channel: 'newK',
      });
      expect(result).toEqual(sampleSettings);
    });
  });
});
