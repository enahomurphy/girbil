
import {
  Resolver,
  Query,
  Arg,
  Authorized,
} from 'type-graphql';

import { UploadType } from './upload.type';
import { AWS } from '../../interfaces';
import aws from '../../services/aws';

@Resolver(UploadType)
class UploadResolver {
  private readonly aws: AWS = aws

  @Authorized('user', 'admin', 'owner')
  @Query(() => UploadType, { nullable: true })
  async getUploadURL(@Arg('id') id: string): Promise<string> {
    return this.aws.getMessageUploadURL(id);
  }
}

export default UploadResolver;
