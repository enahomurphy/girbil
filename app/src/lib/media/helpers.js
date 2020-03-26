export const blobToFile = (blob, name) => new File([blob], name, {
  lastModified: (new Date()).getTime(),
  type: 'video/webm',
});

export default { blobToFile };
