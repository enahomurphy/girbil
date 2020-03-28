/* eslint-disable class-methods-use-this */
import {
  EntityRepository, Repository, getRepository, getManager,
} from 'typeorm';
import { plainToClass } from 'class-transformer';
import {
  Organization, UserOrganization, User, RoleType,
} from '../entity';
import { SearchResult, QueryMap, ParsedText } from '../interfaces';

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

  private getParseSearchText(text: string): ParsedText {
    const searchTypeMap = {
      'is:channel': 'channel',
      'is:unreads': 'unread',
      'is:user': 'user',
    };
    const textArr = text.split(' ');
    const searchTypeText = textArr.find((i) => i.startsWith('is:'));
    const searchType = searchTypeMap[searchTypeText] || 'all';
    const searchText = textArr.filter((i) => i !== searchTypeText).join(' ');
    return {
      searchType,
      searchText: searchText.trim().length ? `%${searchText}%` : '',
    };
  }

  private getQueryMap(searchText: string, organizationId: string, userId: string): QueryMap {
    const channelQuery = `
      SELECT
        channels.id,
        channels.name,
        channels.avatar,
        'channel' AS type,
        conversations.id AS "conversationId",
        COUNT(channel_users.channel_id) AS members,
        is_private AS "isPrivate",
        (
          SELECT not COUNT(channel_users.user_id) = 0
          FROM channel_users
          WHERE channel_users.user_id = $3
          AND channel_users.channel_id = channels.id
          LIMIT 1
        ) AS "isMember"
      FROM channels
      INNER JOIN channel_users ON channel_users.channel_id = channels.id
      LEFT JOIN conversations ON conversations.receiver_id = channels.id AND conversations.receiver_type = 'channel'
      WHERE channels.name ILIKE $1 AND channels.organization_id = $2
      GROUP BY channels.id, conversations.id`;

    const userQuery = `
      SELECT
        users.id AS id,
        users.name AS name,
        users.avatar AS avatar,
        'user' AS type,
        conversations.id AS "conversationId",
        NULL as members,
        NULL AS "isPrivate",
        NULL AS "isMember"
      FROM users
      INNER JOIN user_organizations ON users.id = user_organizations.user_id
      LEFT JOIN conversations ON conversations.receiver_id = users.id OR conversations.creator_id = users.id AND conversations.receiver_type = 'user'
      WHERE users.name ILIKE $1 AND user_organizations.organization_id = $2
      GROUP BY users.id, conversations.id;`;

    return {
      channel: {
        query: `${channelQuery}`,
        params: [searchText, organizationId, userId],
      },
      user: {
        query: `${userQuery}`,
        params: [searchText, organizationId],
      },
      all: {
        query: `${channelQuery} UNION ALL ${userQuery}`,
        params: [searchText, organizationId, userId],
      },
    };
  }

  async search(organizationId: string, text: string, userId: string): Promise<SearchResult[]> {
    const { searchType, searchText } = this.getParseSearchText(text);
    const queryMap = this.getQueryMap(searchText, organizationId, userId);
    const { query, params } = queryMap[searchType];
    const result = await this.entityManager.query(query, params);
    return result;
  }
}

export default OrganizationRepository;
