import { get } from '@shared/lib';
import { spawn, Thread, Worker } from 'threads';

export const uploadThumbnail = async (context, data) => {
  const { thumbnail } = data;
  const { message, urls } = context;
  const uploadURL = get(urls, 'postThumbnailURL');
  const file = new File([thumbnail], message.id, {
    lastModified: (new Date()).getTime(),
    type: 'image/gif',
  });

  const upload = await spawn(new Worker('@/lib/workers/upload'));
  await upload.put(uploadURL, file);

  await Thread.terminate(upload);
};

export const processing = async (context, data) => {
  const { saveMessage } = context;
  const {
    file, urls, conversationId, messageId,
  } = data;
  const uploadURL = get(urls, 'getUploadURL.postVideoURL', '');
  const videoURL = get(urls, 'getUploadURL.getVideoURL');
  const thumbnailURL = get(urls, 'getUploadURL.getThumbnailURL');

  const upload = await spawn(new Worker('@/lib/workers/upload'));
  await upload.put(uploadURL, file);

  await saveMessage({
    id: messageId,
    conversationId,
    video: videoURL,
    thumbnail: thumbnailURL,
  });

  await Thread.terminate(upload);
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
