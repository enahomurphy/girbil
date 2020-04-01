import { config } from 'dotenv';

config();

const url = (): string => {
  if (process.env.NODE_ENV === 'production') return 'https://girbil.com';
  if (process.env.NODE_ENV === 'staging') return 'https://staging.girbil.com';
  return 'http://localhost:1234';
};

interface S3 {
  region: string;
  bucket: string;
}

interface Pusher {
  appId: string;
  key: string;
  secret: string;
  cluster: string;
}

interface AWS {
  key: string;
  secret: string;
  s3: S3;
}

interface Email {
  sparkpost: string;
}

interface Redis {
  host: string;
  port: string;
}

interface Keys {
  port: number;
  authSecret: string;
  domain: string;
  clientURL: string;
  aws: AWS;
  email: Email;
  environment: string;
  url: string;
  pusher: Pusher;
  redis: Redis;
}

const keys: Keys = {
  port: parseInt(process.env.PORT, 10),
  authSecret: process.env.AUTH_SECRET,
  domain: process.env.DOMAIN,
  clientURL: process.env.clientURL,
  aws: {
    key: process.env.AWS_ACCESS_KEY,
    secret: process.env.AWS_ACCESS_SECRET,
    s3: {
      bucket: process.env.AWS_ACCESS_BUCKET,
      region: process.env.AWS_ACCESS_REGION,
    },
  },
  email: {
    sparkpost: process.env.SPARK_POST,
  },
  environment: process.env.NODE_ENV,
  url: url(),
  pusher: {
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
};

export default keys;
