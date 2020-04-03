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

const uploadAndSave = async ({
  file, saveMessage, thumbnail, urls, message,
}) => {
  const uploadURL = get(urls, 'postVideoURL', '');
  const videoURL = get(urls, 'getVideoURL');
  const thumbnailURL = get(urls, 'getThumbnailURL');
  const thumbnailPostURL = get(urls, 'postThumbnailURL');

  await Promise.all([
    upload(uploadURL, file),
    upload(thumbnailPostURL, thumbnail),
  ]);

  await saveMessage({
    id: message.id,
    conversationId: message.conversationId,
    video: videoURL,
    thumbnail: thumbnailURL,
    parentId: message.parentId,
  });
};

export const uploadThumbnail = async (context, data) => {
  const { thumbnail } = data;
  const { urls } = context;
  const uploadURL = get(urls, 'postThumbnailURL');
  await upload(uploadURL, thumbnail);
};

export const processing = async (context, data) => {
  const {
    saveMessage, urls, thumbnail, message,
  } = context;
  const { file } = data;

  await uploadAndSave({
    file, saveMessage, thumbnail, urls, message,
  });
};

export const getUploadUrls = async (_, { getUploadURLS, message, conversationId }) => {
  const { data } = await getUploadURLS({ id: message.id, conversationId });

  return {
    urls: get(data, 'getUploadURL', {}),
  };
};


export const retry = async (context) => {
  const {
    saveMessage, thumbnail, message, file,
  } = context;
  const { data } = await context.getUploadURLS({
    id: message.id, conversationId: message.conversationId,
  });

  const urls = get(data, 'getUploadURL', {});

  await uploadAndSave({
    file, saveMessage, thumbnail, urls, message,
  });
};

export default {
  processing,
  getUploadUrls,
  uploadThumbnail,
  retry,
};
