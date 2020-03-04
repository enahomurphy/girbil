import axios from 'axios';

interface GoogleUser {
  email: string;
  name: string;
  avatar: string;
  verified: boolean;
}

export async function getGoogleUser(accessToken): Promise<GoogleUser> {
  const { data } = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`,
  );

  const {
    email,
    given_name: firstName,
    family_name: lastName,
    verified_email: verified,
    picture: avatar,
  } = data;

  return {
    email,
    name: `${firstName} ${lastName}`,
    avatar,
    verified,
  };
}

export default {
  getGoogleUser,
};
