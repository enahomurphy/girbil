
interface S3 {
  region: string;
  bucket: string;
}

interface AWS {
  key: string;
  secret: string;
  s3Bucket: string;
  s3: S3;
}

interface Email {
  sparkpost: string;
  secret: string;
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
  baseUrl: string;
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
  baseUrl: process.env.NODE_ENV !== 'production' ? 'localhost:1234' : 'girbil.com',
  url: process.env.NODE_ENV !== 'production' ? 'http://localhost:1234' : 'https://girbil.com',
};

export default keys;
