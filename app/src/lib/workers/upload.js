import axios from 'axios';
import { expose } from 'threads/worker';

expose({
  async put(uploadURL, file) {
    await axios({
      method: 'put',
      url: uploadURL,
      data: file,
      headers: { 'content-type': file.type },
    });

    return 'done';
  },
});
