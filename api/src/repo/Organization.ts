import { EntityRepository, Repository, getRepository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import {
  Organization, UserOrganization, User, RoleType,
} from '../entity';

@EntityRepository(Organization)
class OrganizationRepository extends Repository<Organization> {
  private readonly userOrgRepo = getRepository(UserOrganization)

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

  async orgUsers(organizationId: string): Promise<UserOrganization> {
    const users = await this.userOrgRepo.find({
      where: {
        organizationId,
      },
      relations: ['user'],
    });

    return users.map(({ user, ...org }) => ({
      ...org,
      user: user.user,
    }));
  }

  async changeRole(
    organizationId: string, userId: string, role: RoleType,
  ): Promise<UserOrganization> {
    return this.userOrgRepo.update({ userId, organizationId }, { role });
  }

  async deleteUser(organizationId: string, userId: string): Promise<void> {
    return this.userOrgRepo.delete({ userId, organizationId });
  }

  async findById(organizationId: string): Promise<Organization> {
    return this.findOne({ where: { id: organizationId } });
  }
}

export default OrganizationRepository;
