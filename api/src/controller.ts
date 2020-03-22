import { upload } from './services/aws';


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
};
