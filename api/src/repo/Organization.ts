import { EntityRepository, Repository, getRepository } from 'typeorm';
import { Organization, UserOrganization, User } from '../entity';

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

  async createOrganization(name: string, user: User): Promise<Organization> {
    const organization = new Organization();
    organization.name = name;
    organization.userId = user.id;

    await this.manager.transaction(async (manager) => {
      await manager.save(organization);
      const userOrganization = new UserOrganization();
      userOrganization.organizationId = organization.id;
      userOrganization.userId = user.id;
      await manager.save(userOrganization);
    });

    return organization;
  }
}

export default OrganizationRepository;
