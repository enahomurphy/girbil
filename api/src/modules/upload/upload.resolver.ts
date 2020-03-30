import {
  Resolver,
  Query,
  Authorized,
  Ctx,
  Args,
} from 'type-graphql';

import { UploadType, UploadURLType } from './upload.type';
import { UploadURLArgs } from './upload.args';
import { AWS, ContextType } from '../../interfaces';
import aws from '../../services/aws';
import { CanView } from '../../middleware/permissions';
import { ChannelIDArgs } from '../channel/channel.args';
import { keys } from '../../config';

@Resolver(UploadType)
class UploadResolver {
  private readonly aws: AWS = aws

  @Authorized('user', 'admin', 'owner')
  @Query(() => UploadType, { nullable: true })
  @CanView('conversation')
  async getUploadURL(
    @Args() { id, conversationId }: UploadURLArgs,
      @Ctx() { user: { organization } }: ContextType,
  ): Promise<UploadType> {
    const path = `${keys.environment}/${organization.id}/videos/${conversationId}`;
    return this.aws.getMessageUploadURL(id, path);
  }

  @Authorized()
  @Query(() => UploadURLType, { nullable: true })
  async getUserUploadURL(
    @Ctx() { user: { id } }: ContextType,
  ): Promise<UploadURLType> {
    const path = `${keys.environment}/users/${id}/avatar.gif`;
    return this.aws.createSignedURL(path, 'image/gif');
  }

  @Authorized()
  @Query(() => UploadURLType, { nullable: true })
  async getChannelUploadURL(
    @Args() { channelId }: ChannelIDArgs,
      @Ctx() { user: { organization } }: ContextType,
  ): Promise<UploadURLType> {
    const path = `${keys.environment}/${organization.id}/channels/${channelId}/avatar.gif`;
    return this.aws.createSignedURL(path, 'image/gif');
  }
}

export default UploadResolver;
