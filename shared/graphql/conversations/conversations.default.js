
export default {
  messages: Array(20).fill(1).map((value, index) => (
    {
      id: (value + index).toString(),
      url: `/static/vid${Math.ceil(Math.random() * 3)}.mp4`,
      thumbnail: `https://i.picsum.photos/id/${index + value}/125/136.jpg`,
      __typename: 'Message',
      state: (index === 0) ? 'playing' : 'done',
      sender: {
        name: 'girbil bob',
        createdAt: 'on Thursday 5:25 PM',
        __typename: 'MessageSender',
      },
    }
  )),
  message: {
    id: '',
    url: '',
    thumbnail: '',
    state: '',
    __typename: '',
    sender: {
      name: '',
      createdAt: '',
      __typename: '',
    },
  },
};
