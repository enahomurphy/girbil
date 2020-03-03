
import {
  Resolver,
  Query,
} from 'type-graphql';

import { UploadType } from './upload.type';
import aws, { AWS } from '../../services/aws';

@Resolver(UploadType)
class UploadResolver {
  private readonly aws: AWS = aws

  @Query(() => UploadType, { nullable: true })
  async getUploadURL(): Promise<UploadType> {
    return this.aws.createSignedURL('/file.wepm', 'testing');
  }
}

export default UploadResolver;
