import { EntityRepository, Repository, getRepository, getManager } from 'typeorm';
import { plainToClass } from 'class-transformer';
import {
  Organization, UserOrganization, User, RoleType,
} from '../entity';
import { SearchResult } from '../interfaces';

@EntityRepository(Organization)
class OrganizationRepository extends Repository<Organization> {
  private readonly userOrgRepo = getRepository(UserOrganization)
  private readonly entityManager = getManager()

  async findUserOrganizations(userId: string): Promise<Organization[]> {
    const userOrganizations = await this.userOrgRepo.createQueryBuilder('organization')
      .where('organization.userId = :id', { id: userId })
      .leftJoinAndSelect('organization.organization', 'organizations')
      .getMany();

    return userOrganizations.map((uo) => uo.organization);
  }

  async findUserOrganization(userId: string, organizationId: string): Promise<Organization> {
    const organization = await this.userOrgRepo.createQueryBuilder('organization')
      .where('organization.userId = :userId and organization.organizationId = :organizationId', { userId, organizationId })
      .leftJoinAndSelect('organization.organization', 'organizations')
      .getOne();

    if (organization) {
      return plainToClass(Organization, {
        ...organization.organization,
        role: organization.role,
        position: organization.position,
      });
    }

    return null;
  }

  async createOrganization(name: string, domain: string, user: User): Promise<Organization> {
    try {
      const organization = new Organization();
      organization.name = name;
      organization.userId = user.id;
      organization.domain = domain;

      await this.manager.transaction(async (manager) => {
        await manager.save(organization);
        const userOrganization = new UserOrganization();
        userOrganization.organizationId = organization.id;
        userOrganization.userId = user.id;
        userOrganization.role = RoleType.OWNER;
        await manager.save(userOrganization);
      });

      return organization;
    } catch (error) {
      if (error.message.match(/organizations_domain_key/gmi)) {
        throw new Error(`domain ${domain} already exist`);
      }

      throw new Error(error.message);
    }
  }

  async hasUser(organizationId: string, userId: string): Promise<UserOrganization> {
    return this.userOrgRepo.findOne({
      where: {
        userId,
        organizationId,
      },
    });
  }

  async orgUsers(organizationId: string): Promise<UserOrganization[]> {
    const users = await this.userOrgRepo.find({
      where: {
        organizationId,
      },
      relations: ['user'],
    });

    return users.map(({ user, ...org }) => plainToClass(UserOrganization, {
      ...org,
      user: user.user,
    }));
  }

  async changeRole(
    organizationId: string, userId: string, role: RoleType,
  ): Promise<UserOrganization> {
    await this.userOrgRepo.update({ userId, organizationId }, { role });
    return plainToClass(UserOrganization, {
      userId,
      organizationId,
      role,
    });
  }

  async deleteUser(organizationId: string, userId: string): Promise<void> {
    await this.userOrgRepo.delete({ userId, organizationId });
  }

  async findById(organizationId: string): Promise<Organization> {
    return this.findOne({ where: { id: organizationId } });
  }

  async search(organizationId: string, text: string): Promise<SearchResult[]> {

    const result =  await this.entityManager.query(`
        SELECT
          channels.id,
          channels.name,
          channels.avatar,
          'channel' AS type,
          conversations.id AS conversationid,
          COUNT(channel_users.channel_id) AS members
        FROM channels
        INNER JOIN channel_users ON channel_users.channel_id = channels.id
        LEFT JOIN conversations ON conversations.receiver_id = channels.id AND conversations.receiver_type = 'channel'
        WHERE tsv @@ plainto_tsquery($1) AND channels.organization_id = $2
        GROUP BY channels.id, conversations.id
        UNION ALL
        SELECT
          users.id AS id,
          users.name AS name,
          users.avatar AS avatar,
          'user' AS type,
          conversations.id AS conversationid,
          0 as members
        FROM users
        INNER JOIN user_organizations ON users.id = user_organizations.user_id
        LEFT JOIN conversations ON conversations.receiver_id = users.id OR conversations.creator_id = users.id AND conversations.receiver_type = 'user'
        WHERE users.tsv @@ plainto_tsquery($1) AND user_organizations.organization_id = $2
        GROUP BY users.id, conversations.id;
    `, [text, organizationId]);

    return result;
  }
}

export default OrganizationRepository;
