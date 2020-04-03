import * as aws from 'aws-sdk';

import { keys } from '../config';
import { UploadURL, UploadVideo } from '../interfaces';

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
    Expires: 120,
    ACL: 'public-read',
  };

  return new Promise((resolve, reject) => {
    s3Instance.getSignedUrl('putObject', params, (err, signedURL) => {
      if (err) {
        return reject(err);
      }

      return resolve({
        postURL: signedURL,
        getURL: signedURL.split('?')[0],
      });
    });
  });
}

export async function getMessageUploadURL(id: string, path: string): Promise<UploadVideo> {
  const thumbnail = createSignedURL(
    `${path}/${id}/thumbnail.webm`,
    'video/webm',
  );

  const video = createSignedURL(
    `${path}/${id}/message.webm`,
    'video/webm',
  );

  const urls = await Promise.all([thumbnail, video]);

  return {
    postThumbnailURL: urls[0].postURL,
    getThumbnailURL: urls[0].getURL,
    postVideoURL: urls[1].postURL,
    getVideoURL: urls[1].getURL,
  };
}

export const upload = async (fileName, stream): Promise<any> => {
  const options = {
    signatureVersion: 'v4',
    endpoint: `${keys.aws.s3.bucket}.s3-accelerate.amazonaws.com`,
    useAccelerateEndpoint: true,
  };

  const s3Instance = new aws.S3(options);

  const params = {
    Bucket: keys.aws.s3.bucket,
    ContentType: 'video/webm',
    Key: `test/${fileName}.webm`,
    Body: stream,
    ACL: 'public-read',
  };

  return new Promise((resolve, rejects) => s3Instance.upload(params, (error, data) => {
    if (error) {
      return rejects(error);
    }

    return resolve(data);
  }));
};

export default { createSignedURL, getMessageUploadURL };
