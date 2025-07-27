import { prisma } from '../../../../lib/prisma/prisma';
import { UserSettings } from '@prisma/client';
import { IDatabaseRepository } from '../../../../core/interfaces/repositories/IDatabaseRepository';
import { UserSettingsDto } from '../../../../core/dto/user/UserDto';

/**
 * Repository to handle database operations for UserSettings.
 */
export class UserSettingsRepository implements IDatabaseRepository<UserSettings, UserSettingsDto, Partial<UserSettings>>
{
  async create(data: UserSettingsDto): Promise<UserSettings> {
    return prisma.userSettings.create({
      data: {
        userId: data.userId,
        twitchChannel: data.twitchChannel,
        kickChannel: data.kickChannel,
      },
    });
  }

  async update(id: number, data: Partial<UserSettings>): Promise<UserSettings> {
    return prisma.userSettings.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.userSettings.delete({ where: { id } });
  }

  async findById(id: number): Promise<UserSettings | null> {
    return prisma.userSettings.findUnique({ where: { id } });
  }

  async findAll(): Promise<UserSettings[]> {
    return prisma.userSettings.findMany();
  }

  async findByUserId(user_id: number): Promise<UserSettings | null> {
    return prisma.userSettings.findUnique({ where: { userId: user_id } });
  }
}