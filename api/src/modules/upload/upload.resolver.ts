
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
    const path = `${organization.id}/videos/${conversationId}`;
    return this.aws.getMessageUploadURL(id, path);
  }

  @Authorized()
  @Query(() => UploadURLType, { nullable: true })
  async getUserUploadURL(
    @Ctx() { user: { id } }: ContextType,
  ): Promise<UploadURLType> {
    const path = `/users/${id}/avatar.gif`;
    return this.aws.createSignedURL(id, path);
  }
}

export default UploadResolver;
