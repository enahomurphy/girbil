interface AWS {
  key: string;
  secret: string;
}

interface Keys {
  port: number;
  authSecret: string;
  domain: string;
  clientURL: string;
  aws: AWS;
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
};

export default keys;
