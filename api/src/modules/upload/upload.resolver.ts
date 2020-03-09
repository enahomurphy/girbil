
import {
  Resolver,
  Query,
  Arg,
  Authorized,
  Ctx,
} from 'type-graphql';

import { UploadType } from './upload.type';
import { AWS, ContextType } from '../../interfaces';
import aws from '../../services/aws';

@Resolver(UploadType)
class UploadResolver {
  private readonly aws: AWS = aws

  @Authorized('user', 'admin', 'owner')
  @Query(() => UploadType, { nullable: true })
  async getUploadURL(
    @Arg('id') id: string,
      @Ctx() { user: { id: userId, organization } }: ContextType,
  ): Promise<string> {
    const path = `${userId}/${organization.id}`;
    return this.aws.getMessageUploadURL(id, path);
  }
}

export default UploadResolver;
