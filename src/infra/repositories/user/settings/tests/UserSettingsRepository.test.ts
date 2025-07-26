import { prisma } from '../../../../../lib/prisma/prisma';
import { UserSettingsRepository } from '../UserSettingsRepository';
import { UserSettingsDto } from '../../../../../core/dto/user/settings/UserSettingsDto';

jest.mock('../../../../../lib/prisma/prisma', () => ({
  prisma: {
    userSettings: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

describe('UserSettingsRepository', () => {
  const repo = new UserSettingsRepository();
  const sampleDto: UserSettingsDto = {
    user_id: 1,
    twitch_channel: 'twitch123',
    kick_channel: 'kick123',
  };
  const sampleModel = { id: 10, userId: 1, twitchChannel: 'twitch123', kickChannel: 'kick123' };

  it('create()', async () => {
    (prisma.userSettings.create as jest.Mock).mockResolvedValue(sampleModel);
    const res = await repo.create(sampleDto);
    expect(res).toEqual(sampleModel);
    expect(prisma.userSettings.create).toHaveBeenCalledWith({
      data: { userId: 1, twitchChannel: 'twitch123', kickChannel: 'kick123' },
    });
  });

  it('update()', async () => {
    (prisma.userSettings.update as jest.Mock).mockResolvedValue(sampleModel);
    const res = await repo.update(10, { twitchChannel: 'newT' });
    expect(res).toEqual(sampleModel);
    expect(prisma.userSettings.update).toHaveBeenCalledWith({
      where: { id: 10 },
      data: { twitchChannel: 'newT' },
    });
  });

  it('delete()', async () => {
    (prisma.userSettings.delete as jest.Mock).mockResolvedValue(undefined);
    await expect(repo.delete(10)).resolves.toBeUndefined();
    expect(prisma.userSettings.delete).toHaveBeenCalledWith({ where: { id: 10 } });
  });

  it('findById()', async () => {
    (prisma.userSettings.findUnique as jest.Mock).mockResolvedValue(sampleModel);
    const res = await repo.findById(10);
    expect(res).toEqual(sampleModel);
    expect(prisma.userSettings.findUnique).toHaveBeenCalledWith({ where: { id: 10 } });
  });

  it('findAll()', async () => {
    (prisma.userSettings.findMany as jest.Mock).mockResolvedValue([sampleModel]);
    const res = await repo.findAll();
    expect(res).toEqual([sampleModel]);
  });

  it('findByUserId()', async () => {
    (prisma.userSettings.findUnique as jest.Mock).mockResolvedValue(sampleModel);
    const res = await repo.findByUserId(1);
    expect(res).toEqual(sampleModel);
    expect(prisma.userSettings.findUnique).toHaveBeenCalledWith({ where: { userId: 1 } });
  });
});
