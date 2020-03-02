interface AWS {
  key: string;
  secret: string;
}

interface Keys {
  port: string;
  authSecrete: string;
  domain: string;
  clientURL: string;
  aws: AWS;
}

const keys: Keys = {
  port: process.env.PORT,
  authSecrete: process.env.AUTH_SECRET,
  domain: process.env.DOMAIN,
  clientURL: process.env.clientURL,
  aws: {
    key: process.env.AWS_ACCESS_SECRET,
    secret: process.env.AWS_ACCESS_SECRET,
  },
};

export default keys;
