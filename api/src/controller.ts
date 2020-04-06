/* eslint-disable @typescript-eslint/camelcase */
import { getCustomRepository } from 'typeorm';

import { decode } from './utils/jwt';
import { upload } from './services/aws';
import socket from './services/socket';
import UserRepository from './repo/User';


export default (app): void => {
  app.post('/upload', async (req, res) => {
    try {
      const { data } = req.body;
      const dataBuffer = Buffer.from(data, 'base64');
      await upload('filename', dataBuffer);
      return res.json({ gotit: true });
    } catch (error) {
      return res.json({ gotit: false });
    }
  });

  app.post('/socket/auth', (req, res): void => {
    const { socket_id: socketId, channel_name: channel } = req.body;
    const tokenWithBearer = req.headers.authorization || '';
    const token = tokenWithBearer.split(' ')[1];
    const user = decode(token);

    if (!user) {
      return res.status(403).send();
    }

    const userRepo = getCustomRepository(UserRepository);
    userRepo.update({ id: user.id }, { lastActive: new Date() });

    const presenceData = {
      user_id: user.id,
      user_info: {
        email: user.email,
      },
    };

    const auth = socket.authenticate(
      socketId,
      channel,
      presenceData,
    );

    return res.send(auth);
  });
};
