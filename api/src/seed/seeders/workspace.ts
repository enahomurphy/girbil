/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import {
  Factory, Seeder, times, getConnection,
} from 'typeorm-seeding';
import faker from 'faker';

import {
  Team, User, Channel, Conversation, Message,
} from '../../entity';

export default class CreateTeams implements Seeder {
  public async run(factory: Factory): Promise<any> {
    const connection = getConnection();
    const em = connection.createEntityManager();

    await times(10, async () => {
      const user: User = await factory(User)().seed();
      const team = await factory(Team)({ userId: user.id }).make();
      const users: User[] = await factory(User)().seedMany(10);

      team.users = users;
      await em.save(team);

      await times(10, async () => {
        const channel: Channel = await factory(Channel)(
          { teamId: team.id, userId: team.userId },
        ).make();

        const max = faker.random.number({ min: 2, max: 8 });
        channel.users = users.filter((u, i) => i > max);

        await em.save(channel);

        const conversation: Conversation = await factory(Conversation)(
          {
            sender: team.userId,
            receiver: channel.id,
            teamId: team.id,
          },
        ).seed();

        await factory(Message)(
          {
            userId: faker.random.arrayElement(users.map(({ id }) => id)),
            conversationId: conversation.id,
          },
        ).seedMany(2);
      });
    });
  }
}
