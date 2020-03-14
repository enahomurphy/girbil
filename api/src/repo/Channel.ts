import { EntityRepository, Repository } from 'typeorm';
import { Channel } from '../entity';

@EntityRepository(Channel)
class ChannelRepository extends Repository<Channel> {
  async search(organizationId: string, text: string): Promise<Channel[]> {
    const query = this.createQueryBuilder('channel')
      .leftJoinAndSelect('channel.conversation', 'conversation')
      .addSelect('( SELECT COUNT(*) FROM channel_users WHERE channel_id = channel.id )', 'channel_members')
      .setParameter('text', `${text}:*`);

    if (text) {
      query.where('tsv @@ plainto_tsquery(:text)');
    }

    return query.andWhere('channel.organization_id = :organizationId', { organizationId })
      .take(20)
      .skip(0)
      .getMany();
  }
}

export default ChannelRepository;
