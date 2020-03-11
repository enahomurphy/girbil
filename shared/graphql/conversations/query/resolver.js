import { GET_MESSAGES } from './query';

export const getMessages = (_, args, { cache }) => {
  console.log(args)
  const { messages } = cache.readQuery({
    query: GET_MESSAGES,
    variables: {
      conversationId: args.conversationId
    }
  });
  
  const foundMessages = messages
    .filter(({ id, conversationId, parentId }) => {
      if (args.messageId) {
        return (
          (id === args.messageId) && 
          (args.conversationId === conversationId)
        );
      }

      return (args.conversationId === conversationId) && (parentId === null);
    });

    console.log(foundMessages, 'fpiun');

  return foundMessages;
};

export const getMessage = (_, args, { cache }) => {
  const { messages } = cache.readQuery({
    query: MESSAGES,
  });
  
  const message = messages.find(({ id, conversationId }) => {
    return (
      (id === args.messageId) && 
      (args.conversationId === conversationId)
    )
  });

  return message;
}