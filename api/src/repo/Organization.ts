import { EntityRepository, Repository, getRepository } from 'typeorm';
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
}

export default OrganizationRepository;
