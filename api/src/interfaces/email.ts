import { Organization } from '../entity';

export interface InviteEmails {
  email: string;
  token: string;
  organization: Organization;
}
