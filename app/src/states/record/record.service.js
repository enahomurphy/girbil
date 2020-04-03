import { get } from '@shared/lib';
import axios from 'axios';
import { blobToFile } from '@/lib/media';

const uploadHandler = async (uploadURL, file) => {
  await axios({
    method: 'put',
    url: uploadURL,
    data: file,
    headers: { 'content-type': file.type },
  });

  return 'done';
};

const uploadAndSave = async ({
  video, saveMessage, thumbnail, urls, message,
}) => {
  const uploadURL = get(urls, 'postVideoURL', '');
  const videoURL = get(urls, 'getVideoURL');
  const thumbnailURL = get(urls, 'getThumbnailURL');
  const thumbnailPostURL = get(urls, 'postThumbnailURL');

  await Promise.all([
    uploadHandler(uploadURL, video),
    uploadHandler(thumbnailPostURL, thumbnail),
  ]);

  await saveMessage({
    id: message.id,
    conversationId: message.conversationId,
    video: videoURL,
    thumbnail: thumbnailURL,
    parentId: message.parentId,
  });
};

export const upload = async (context) => {
  const {
    saveMessage, message, videoBlob, thumbnailBlob,
  } = context;
  const { data: { getUploadURL: urls } } = await context.getUploadURLS({
    id: message.id, conversationId: message.conversationId,
  });

  const video = blobToFile([videoBlob], message.id);
  const thumbnail = blobToFile([thumbnailBlob], message.id);

  await uploadAndSave({
    video, thumbnail, saveMessage, urls, message,
  });
};

export const getUploadUrls = async (_, { getUploadURLS, message, conversationId }) => {
  const { data } = await getUploadURLS({ id: message.id, conversationId });

  return {
    urls: get(data, 'getUploadURL', {}),
  };
};

export const deleteLocalMessageMessage = async (context) => {
  const { deleteMessage, message } = context;
  deleteMessage(message.id);
};

export default {
  upload,
  deleteLocalMessageMessage,
};
