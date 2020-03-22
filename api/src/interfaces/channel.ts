import { User } from '../entity';


export interface ChannelMembers {
  members: User[];

  count: number;
}
