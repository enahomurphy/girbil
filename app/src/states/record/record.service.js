import axios from 'axios';
import { get } from '@shared/lib';

export const uploadThumbnail = async (context, data) => {
  const { thumbnail } = data;
  const { message, urls } = context;
  const uploadURL = get(urls, 'postThumbnailURL');
  const file = new File([thumbnail], message.id, {
    lastModified: (new Date()).getTime(),
    type: 'image/gif',
  });

  await axios({
    method: 'put',
    url: uploadURL,
    data: file,
    headers: { 'content-type': file.type },
  });
};

export const processing = async (context, data) => {
  const { saveMessage } = context;
  const {
    file, urls, conversationId, messageId,
  } = data;
  const uploadURL = get(urls, 'getUploadURL.postVideoURL', '');
  const videoURL = get(urls, 'getUploadURL.getVideoURL');
  const thumbnailURL = get(urls, 'getUploadURL.getThumbnailURL');

  await axios({
    method: 'put',
    url: uploadURL,
    data: file,
    headers: { 'content-type': file.type },
  });

  return saveMessage({
    id: messageId,
    conversationId,
    video: videoURL,
    thumbnail: thumbnailURL,
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
