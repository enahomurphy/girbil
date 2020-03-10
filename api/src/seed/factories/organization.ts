
import Faker from 'faker';

import { define } from 'typeorm-seeding';
import { Organization } from '../../entity';

define(Organization, (faker: typeof Faker, settings: { userId: string }) => {
  const organization = new Organization();
  organization.name = faker.company.companyName();
  organization.domain = faker.internet.domainName();
  organization.logo = faker.internet.avatar();
  organization.userId = settings.userId;
  return organization;
});
