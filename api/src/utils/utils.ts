export const pick = (obj: any, keys: string[]): any => keys.reduce((acc, key) => {
  if (!obj[key]) {
    return acc;
  }
  return { ...acc, [key]: obj[key] };
}, {});
