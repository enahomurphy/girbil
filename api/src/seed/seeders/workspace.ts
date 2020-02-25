/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import {
  Factory, Seeder, times, getConnection,
} from 'typeorm-seeding';
import faker from 'faker';

import {
  Workspace, User, Channel, ChannelType,
} from '../../entity';

export default class CreateWorkspaces implements Seeder {
  public async run(factory: Factory): Promise<any> {
    const connection = getConnection();
    const em = connection.createEntityManager();

    await times(10, async () => {
      const user: User = await factory(User)().seed();
      const workspace = await factory(Workspace)({ userId: user.id }).make();
      const users: User[] = await factory(User)().seedMany(10);

      workspace.users = users;
      await em.save(workspace);

      await times(10, async () => {
        const channel: Channel = await factory(Channel)(
          { ownerId: workspace.id, type: ChannelType.TEAM, userId: workspace.userId },
        ).make();

        const max = faker.random.number({ min: 2, max: 8 });
        channel.users = users.filter((u, i) => i > max);

        await em.save(channel);
      });
    });
  }
}
