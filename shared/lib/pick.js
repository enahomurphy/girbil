export const pick = (obj, keys) => keys.reduce((acc, key) => {
  const [initial, real] = key.split(':');
  const realKey = real || initial;

  if (!obj[initial]) {
    return acc;
  }

  return { ...acc, [realKey]: obj[initial] };
}, {});


export default pick;
