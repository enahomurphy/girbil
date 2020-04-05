export const mergeArrayByField = (_, incoming = [], { readField }) => {
  const mergedMap = incoming.reduce(
    (acc, item) => {
      acc.set(readField('id', item), item);

      return acc;
    },
    new Map(),
  );
  const result = [];
  mergedMap.forEach((value) => result.push(value));

  return result;
};

export default {
  mergeArrayByField,
};
