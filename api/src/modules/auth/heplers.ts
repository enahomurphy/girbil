import { getCustomRepository, getRepository } from 'typeorm';
import short from 'short-uuid';

import { OrganizationRepo } from '../../repo';
import { decodeInviteToken } from '../../utils/jwt';
import {
  Share, UserOrganization, RoleType, Invite,
} from '../../entity';

const shareRepo = getRepository(Share);
const orgRepo = getCustomRepository(OrganizationRepo);
const userOrgRepo = getRepository(UserOrganization);
const inviteRepo = getRepository(Invite);

export const tokenForOrgId = async (
  emailToken: string,
): Promise<Invite> => {
  const [id, orgId] = decodeInviteToken(emailToken).split('+');
  if (!orgId || !id) {
    throw new Error('Invite id not found');
  }

  const invite = await inviteRepo.findOne(
    {
      where: { id },
      cache: true,
    },
  );

  if (!invite || (invite && invite.organizationId !== orgId)) {
    throw new Error('Invite id not found');
  }

  return invite;
};


export const handleInvite = async (userId: string, inviteId?: string): Promise<Organization> => {
  if (!inviteId) {
    return null;
  }

  const translator = short();
  const shareId = translator.toUUID(inviteId);

  const share = await shareRepo.findOne({ where: { id: shareId } });
  if (!share) {
    return null;
  }

  const org = await orgRepo.findById(share.organizationId);

  if (!org) {
    return null;
  }

  try {
    const isUserInOrg = await userOrgRepo.findOne({ where: { userId, organizationId: org.id } });

    if (isUserInOrg) {
      return org;
    }

    await userOrgRepo.insert({ userId, organizationId: org.id });
    org.role = RoleType.USER;
    return org;
  } catch (err) {
    return null;
  }
};

export const handleEmailInvite = async (
  userId: string, emailToken?: string,
): Promise<Organization> => {
  if (!emailToken) {
    return null;
  }

  const { id, organizationId } = await tokenForOrgId(emailToken);

  const org = await orgRepo.findById(organizationId);

  if (!org) {
    return null;
  }

  try {
    const isUserInOrg = await userOrgRepo.findOne({ where: { userId, organizationId } });

    if (isUserInOrg) {
      return org;
    }

    await userOrgRepo.insert({ userId, organizationId: org.id });

    inviteRepo.delete({ id });
    return org;
  } catch (err) {
    return null;
  }
};
