import { get } from '@shared/lib';
import axios from 'axios';

const upload = async (uploadURL, file) => {
  await axios({
    method: 'put',
    url: uploadURL,
    data: file,
    headers: { 'content-type': file.type },
  });

  return 'done';
};

export const uploadThumbnail = async (context, data) => {
  const { thumbnail } = data;
  const { message, urls } = context;
  const uploadURL = get(urls, 'postThumbnailURL');
  const file = new File([thumbnail], message.id, {
    lastModified: (new Date()).getTime(),
    type: 'image/gif',
  });

  await upload(uploadURL, file);
};

export const processing = async (context, data) => {
  const { saveMessage } = context;
  const {
    file, urls, conversationId, messageId, parentId,
  } = data;
  const uploadURL = get(urls, 'getUploadURL.postVideoURL', '');
  const videoURL = get(urls, 'getUploadURL.getVideoURL');
  const thumbnailURL = get(urls, 'getUploadURL.getThumbnailURL');

  await upload(uploadURL, file);

  await saveMessage({
    id: messageId,
    conversationId,
    video: videoURL,
    thumbnail: thumbnailURL,
    parentId,
  });
};

export const getUploadUrls = async (_, { getUploadURLS, message, conversationId }) => (
  getUploadURLS({
    variables: { id: message.id, conversationId },
  })
);


export default {
  processing,
  getUploadUrls,
  uploadThumbnail,
};
