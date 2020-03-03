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

// const {OAuth2Client} = require('google-auth-library');
// const client = new OAuth2Client(CLIENT_ID);
// async function verify() {
//   const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
//       // Or, if multiple clients access the backend:
//       //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//   });
//   const payload = ticket.getPayload();
//   const userid = payload['sub'];
//   // If request specified a G Suite domain:
//   //const domain = payload['hd'];
// }
// verify().catch(console.error);
