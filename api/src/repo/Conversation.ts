import { EntityRepository, Repository, getRepository } from 'typeorm';
import { Conversation } from '../entity';

@EntityRepository(Conversation)
class ConversationRepository extends Repository<Conversation> {
  private readonly userOrgRepo = getRepository(Conversation)
}

export default ConversationRepository;
