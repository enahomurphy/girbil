import * as aws from 'aws-sdk';
import { plainToClass } from 'class-transformer';

import { keys } from '../config';
import { UploadType } from '../modules/upload/upload.type';
import { UploadURL } from '../interfaces';

aws.config.update({
  accessKeyId: keys.aws.key,
  secretAccessKey: keys.aws.secret,
  region: keys.aws.s3.region,
});

export function createSignedURL(name: string, type: string): Promise<UploadURL> {
  const options = {
    signatureVersion: 'v4',
    endpoint: `${keys.aws.s3.bucket}.s3-accelerate.amazonaws.com`,
    useAccelerateEndpoint: true,
  };

  const s3Instance = new aws.S3(options);

  const params = {
    Bucket: keys.aws.s3.bucket,
    ContentType: type,
    Key: name,
    Expires: 60,
    ACL: 'public-read',
  };

  return new Promise((resolve, reject) => {
    s3Instance.getSignedUrl('putObject', params, (err, signedURL) => {
      if (err) {
        return reject(err);
      }

      return resolve(plainToClass(UploadURL, {
        postURL: signedURL,
        getURL: signedURL.split('?')[0],
      }));
    });
  });
}

export async function getMessageUploadURL(id: string): Promise<UploadType> {
  const thumbnail = createSignedURL(
    `${id}-thumbnail`,
    'image/gif',
  );

  const video = createSignedURL(
    `${id}-message`,
    'video/webm',
  );

  const urls = await Promise.all([thumbnail, video]);

  return plainToClass(UploadType, {
    postThumbnailURL: urls[0].postURL,
    getThumbnailURL: urls[0].getURL,
    postVideoURL: urls[1].postURL,
    getVideoURL: urls[1].getURL,
  });
}

export default { createSignedURL, getMessageUploadURL };
