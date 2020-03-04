import SparkPost from 'sparkpost';
import { keys } from '../../config';
import invite from './invite';
import { InviteEmails } from '../../interfaces';

const client = new SparkPost(keys.email.sparkpost);

export const sendInvites = async (invites: InviteEmails[]): Promise<void> => {
  const messages = invites.map(({ email, token, organization }) => client.transmissions
    .send({
      content: {
        from: 'Girbil <support@unbird.com>',
        subject: `${organization.name} invited you to join its organization`,
        html: invite(token, organization.name),
      },
      recipients: [{ address: email }],
    }));

  return Promise.all(messages);
};
