import axios from 'axios';
import { get } from '@shared/lib';

export const processing = async (context, data) => {
  const { saveMessage } = context;
  const { file, urls, conversationId, messageId } = data;
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

export const getUploadUrls = async ({ getUploadURLS }, { message }) => {
  return getUploadURLS({
    variables: { id: message.id },
  });
};


export default {
  processing,
  getUploadUrls,
};
