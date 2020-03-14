import { EntityRepository, Repository } from 'typeorm';
import { Channel } from '../entity';

@EntityRepository(Channel)
class ChannelRepository extends Repository<Channel> {
  async search(organizationId: string, text: string): Promise<Channel[]> {
    return this.createQueryBuilder('channel')
      .addSelect('( SELECT COUNT(*) FROM channel_users WHERE channel_id = channel.id )', 'channel_members')
      .where('tsv @@ to_tsquery(:text)', { text })
      .andWhere('organization_id = :organizationId', { text, organizationId })
      .getMany();
  }
}

export default ChannelRepository;
