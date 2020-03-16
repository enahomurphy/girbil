export const mergeUniqueArrays = (...args) => {
  const concatArrays = [];
  args.forEach((array) => {
    concatArrays.push(...array);
  });

  const mergedArrays = concatArrays.reduce(
    (acc, item) => {
      acc.set(item.id, item);

      return acc;
    },
    new Map(),
  ).values();

  return Array.from(mergedArrays);
};

export default {};
