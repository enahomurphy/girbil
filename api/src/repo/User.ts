import { EntityRepository, Repository, getRepository } from 'typeorm';
import { plainToClass } from 'class-transformer';

import { User, UserSetting } from '../entity';
import { hashPassword } from '../utils/password';
import { UserSettingInterface } from '../interfaces';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  private readonly userSettingRepo = getRepository(UserSetting)

  findByEmail(email): Promise<User> {
    return this.findOne({ email });
  }

  async createUser(email: string, name?: string, password?: string): Promise<User> {
    try {
      const user = await this.save(this.create({
        email: email.toLowerCase(),
        password: hashPassword(password),
        name,
      }));

      return UserRepository.select(user);
    } catch (error) {
      if (error.message.match(/users_email_key/gmi)) {
        throw new Error(`email ${email} already exist`);
      }

      throw new Error(error.message);
    }
  }

  async findOrCreateGoogleUser(
    email: string,
    avatar: string,
    name: string,
    verified: boolean,
  ): Promise<User> {
    let user = await this.findOne({ email });

    if (!user) {
      user = await this.save(this.create({
        email: email.toLowerCase(),
        name,
        isVerified: verified,
        avatar,
      }));
    }

    return UserRepository.select(user);
  }

  static select(user: User): User {
    const userToUpdate = { ...user };
    userToUpdate.isVerified = user.isVerified;
    delete userToUpdate.password;
    return plainToClass(User, userToUpdate);
  }

  async first(): Promise<User> {
    const user = await this.findOne();

    return UserRepository.select(user);
  }

  async user(userId: string): Promise<User> {
    return this.findOne(userId);
  }

  async upsertSettings(userId: string, organizationId: string, hideInviteWidget: boolean) {
    const settings: UserSettingInterface = { hideInviteWidget };

    await this.userSettingRepo.createQueryBuilder()
      .setParameter('settings', settings)
      .insert()
      .values({
        userId,
        organizationId,
        settings
      })
      .onConflict(`("user_id", "organization_id") DO UPDATE SET "settings" = coalesce(user_settings.settings, '{}') || :settings`)
      .execute();
  }
}

export default UserRepository;
