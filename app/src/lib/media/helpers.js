export const blobToFile = (blob, name, type = 'video/webm') => new File([blob], name, {
  lastModified: (new Date()).getTime(),
  type,
});

export default { blobToFile };
