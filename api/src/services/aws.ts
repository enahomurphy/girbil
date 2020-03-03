import * as aws from 'aws-sdk';
import { plainToClass } from 'class-transformer';

import { keys } from '../config';
import { UploadType } from '../modules/upload/upload.type';

aws.config.update({
  accessKeyId: keys.aws.secret,
  secretAccessKey: keys.aws.key,
});

export interface AWS {
  createSignedURL: (url: string, type: string) => Promise<UploadType>;
}

function createSignedURL(url: string, type: string): Promise<UploadType> {
  const options = {
    signatureVersion: 'v4',
    endpoint: 'girbil.s3-accelerate.amazonaws.com',
    useAccelerateEndpoint: true,
  };

  const s3Instance = new aws.S3(options);

  const params = {
    Bucket: 'girbil',
    ContentType: type,
    Key: url,
    Expires: 60,
    ACL: 'public-read',
  };

  return new Promise((resolve, reject) => {
    s3Instance.getSignedUrl('putObject', params, (err, signedURL) => {
      if (err) {
        return reject(err);
      }

      return resolve(plainToClass(UploadType, {
        postURL: signedURL,
        getURL: signedURL.split('?')[0],
      }));
    });
  });
}

export { createSignedURL };
export default { createSignedURL };
