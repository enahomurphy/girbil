
export default {
  messages: Array(20).fill(1).map((value, index) => (
    {
      id: value + index,
      url: `/static/vid${Math.ceil(Math.random() * 3)}.mp4`,
      thumbnail: '',
      color: ['red', 'blue', 'green', 'orange', 'gray'][Math.floor(Math.random() * 4)],
      __typename: `${value}_${index}`,
    }
  )),
  message: {
    id: '',
    url: '',
    thumbnail: '',
    color: '',
    __typename: '',
  },
};
