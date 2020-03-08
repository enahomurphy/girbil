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
import connectionCreator from '../helper/connectionCreator';

export default class CreateTeams implements Seeder {
  public async run(factory: Factory): Promise<any> {
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

      await times(10, async (index) => {
        const linkUserToOrganization = await factory(UserOrganization)({
          userId: users[index].id,
          organizationId: organization.id,
          role: RoleType.USER,
        }).make();

        await em.save(linkUserToOrganization);
      });

      const userIds = users.map(({ id }) => id);

      const conversationConnection = connectionCreator(userIds);


      await times(10, async (index) => {
        await factory(Conversation)(
          {
            creatorId: conversationConnection[index][0],
            receiverId: conversationConnection[index][1],
            organizationId: organization.id,
            type: ConversationType.USER,
          },
        ).seed();
      });

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
