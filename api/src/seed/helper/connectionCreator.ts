export default (ids: string[]): string[][] => {
  const connections = [];
  const arrLength = ids.length;
  for (let i = 0; i < arrLength; i += 1) {
    for (let y = 0; y < arrLength; y += 1) {
      if ((y + i) < arrLength && (i !== (y + i))) {
        connections.push([ids[i], ids[y + i]]);
      }
    }
  }
  return connections;
};
