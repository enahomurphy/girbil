
interface Cred {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
}

interface SocialCred {
  google: Cred;
  facebook: Cred;
  linkedin: Cred;
}

const Social: SocialCred = {
  google: {
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  facebook: {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_APP_CALLBACK_URL,
  },
  linkedin: {
    clientID: process.env.LINKEDIN_ID,
    clientSecret: process.env.LINKEDIN_SECRET,
    callbackURL: process.env.LINKEDIN_CALLBACK_URL,
  },
};

export default Social;
