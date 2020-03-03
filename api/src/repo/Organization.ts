import { EntityRepository, Repository, getRepository } from 'typeorm';
import { Organization, UserOrganization } from '../entity';

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
}

export default OrganizationRepository;
