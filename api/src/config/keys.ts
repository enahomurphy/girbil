interface AWS {
  key: string;
  secret: string;
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
}

const keys: Keys = {
  port: parseInt(process.env.PORT, 10),
  authSecret: process.env.AUTH_SECRET,
  domain: process.env.DOMAIN,
  clientURL: process.env.clientURL,
  aws: {
    key: process.env.AWS_ACCESS_SECRET,
    secret: process.env.AWS_ACCESS_SECRET,
  },
  email: {
    sparkpost: process.env.SPARK_POST,
  },
  environment: process.env.NODE_ENV,
  url: process.env.NODE_ENV !== 'production' ? 'http://localhost:1234' : 'https://girbil.com',
};

export default keys;
