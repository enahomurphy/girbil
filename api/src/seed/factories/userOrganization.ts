import Faker from 'faker';

import { define } from 'typeorm-seeding';
import { UserOrganization, RoleType } from '../../entity';

define(UserOrganization, (faker: typeof Faker, settings: {
  userId: string; organizationId: string; role: RoleType;
}) => {
  const userOrganization = new UserOrganization();
  userOrganization.userId = settings.userId;
  userOrganization.organizationId = settings.organizationId;
  userOrganization.role = settings.role;


  return userOrganization;
});
