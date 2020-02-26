interface Keys {
  port: string;
  authSecrete: string;
  domain: string;
  clientURL: string;

}

const keys: Keys = {
  port: process.env.PORT,
  authSecrete: process.env.AUTH_SECRET,
  domain: process.env.DOMAIN,
  clientURL: process.env.clientURL,
};

export default keys;
