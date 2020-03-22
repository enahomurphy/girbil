import { Organization } from 'src/entity';

export interface InviteEmails {
  email: string;
  token: string;
  organization: Organization;
}
