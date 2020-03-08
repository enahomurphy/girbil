import { ViewEntity } from 'typeorm';
import { Conversation } from './conversation';

@ViewEntity({ name: 'user_conversation_view' })
export class UserConversations extends Conversation {}
