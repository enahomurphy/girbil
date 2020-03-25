export const pick = (obj, keys) => keys.reduce((acc, key) => {
  if (!obj[key]) {
    return acc;
  }
  return { ...acc, [key]: obj[key] };
}, {});


export default pick;
