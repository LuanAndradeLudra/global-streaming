import { UserSettings } from '@prisma/client';
import { IDatabaseManager } from '../../../core/interfaces/managers/IDatabaseManager';
import { UserSettingsRepository } from '../../../infra/repositories/user/settings/UserSettingsRepository';
import { UserSettingsDto } from '../../../core/dto/user/UserDto';

/**
 * Manager responsible for user settings logic and persistence.
 */
export class UserSettingsManager
  implements IDatabaseManager<UserSettings, UserSettingsDto>
{
  private repository = new UserSettingsRepository();

  async create(data: UserSettingsDto): Promise<UserSettings> {
    return this.repository.create(data);
  }

  async update(id: number, data: Partial<UserSettings>): Promise<UserSettings> {
    return this.repository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.repository.delete(id);
  }

  async findById(id: number): Promise<UserSettings | null> {
    return this.repository.findById(id);
  }

  async findAll(): Promise<UserSettings[]> {
    return this.repository.findAll();
  }

  async findByUserId(user_id: number): Promise<UserSettings | null> {
    return this.repository.findByUserId(user_id);
  }

  async upsertByUserId(
    user_id: number,
    data: UserSettingsDto
  ): Promise<UserSettings> {
    const existing = await this.repository.findByUserId(user_id);
    if (existing) {
      return this.repository.update(existing.id, {
        twitchChannel: data.twitchChannel,
        kickChannel: data.kickChannel,
      });
    }
    return this.repository.create({
      userId: user_id,
      twitchChannel: data.twitchChannel,
      kickChannel: data.kickChannel,
    });
  }
}