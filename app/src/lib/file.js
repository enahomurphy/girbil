export const isImage = (url) => {
  if (!url) {
    return true;
  }

  const parts = url.split('.');
  const ext = parts[parts.length - 1];
  const isWebm = ext === 'webm' || parts === 1;

  return !isWebm;
};


export default { isImage };
