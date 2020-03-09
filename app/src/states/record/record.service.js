import axios from 'axios';

export const processing = async (context, data) => {
  const { file, url } = data;
  await axios({
    method: 'put',
    url,
    data: file,
    headers: { 'content-type': file.type },
  }).then(() => {
    console.log(data);
  })
    .catch(console.error);
};

export const getUploadUrls = async ({ getUploadURLS }) => {
  const data = await getUploadURLS({
    variables: { id: 'sddsasdd' },
  });
};


export default {
  processing,
  getUploadUrls,
};
