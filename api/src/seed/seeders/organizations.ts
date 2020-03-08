/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import {
  Factory, Seeder, times, getConnection,
} from 'typeorm-seeding';
import faker from 'faker';

import {
  Team, User, Channel, Conversation, Message, Organization,
  UserOrganization, RoleType, ConversationType,
} from '../../entity';

export default class CreateTeams implements Seeder {
  public async run(factory: Factory): Promise<any> {
    // create users
    // create organizations
    // add user to organization
    // add users

    const connection = getConnection();
    const em = connection.createEntityManager();

    await times(10, async () => {
      const user: User = await factory(User)().seed();

      const organization = await factory(Organization)({ userId: user.id }).make();
      await em.save(organization);

      const userOrganization = await factory(UserOrganization)({
        userId: user.id,
        organizationId: organization.id,
        role: RoleType.OWNER,
      }).make();

      await em.save(userOrganization);

      const team = await factory(Team)({ userId: user.id, organizationId: organization.id }).make();
      const users: User[] = await factory(User)().seedMany(10);

      team.users = users;
      await em.save(team);

      await times(10, async () => {
        const channel: Channel = await factory(Channel)(
          { ownerId: team.id, userId: team.userId, organizationId: organization.id },
        ).make();


        const max = faker.random.number({ min: 2, max: 8 });
        channel.users = users.filter((u, i) => i > max);

        await em.save(channel);

        const conversation: Conversation = await factory(Conversation)(
          {
            creatorId: team.userId,
            receiverId: channel.id,
            organizationId: organization.id,
            type: ConversationType.CHANNEL,
          },
        ).seed();

        await factory(Message)(
          {
            userId: faker.random.arrayElement(users.map(({ id }) => id)),
            conversationId: conversation.id,
          },
        ).seedMany(faker.random.number({ min: 2, max: 10 }));
      });
    });
  }
}
