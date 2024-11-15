/* eslint-disable class-methods-use-this */
import { CometChat } from '@cometchat-pro/chat';

class Chat {
  constructor(UID) {
    this.messageLimit = 20;
    this.conversationLimit = 50;
    this.UID = UID;
  }

  async init() {
    const appID = process.env.COMET_CHAT_APP_ID;
    const region = process.env.COMET_CHAT_REGION;

    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(region)
      .build();
    try {
      await CometChat.init(appID, appSetting);
      const apiKey = process.env.COMET_CHAT_API_KEY;
      const user = await CometChat.login(this.UID, apiKey);
      return user;
    } catch (error) {
      // handle error
      return error;
    }
  }

  async sendMessage(receiverID, typeOfReciever, data) {
    const messageType = CometChat.MESSAGE_TYPE.FILE;

    const receiverType = typeOfReciever === 'user' ? CometChat.RECEIVER_TYPE.USER : CometChat.RECEIVER_TYPE_GROUP;

    const mediaMessage = new CometChat.MediaMessage(
      receiverID,
      data,
      messageType,
      receiverType,
    );

    try {
      const message = await CometChat.sendMediaMessage(mediaMessage);
      return message;
    } catch (error) {
      // handle error
      return error;
    }
  }

  receiveMessage(listenerID) {
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onMediaMessageReceived: () => {
          // Handle media message
        },
      }),
    );
  }

  async receiveMissedMessages() {
    try {
      const latestId = await CometChat.getLastDeliveredMessageId();

      const messagesRequest = new CometChat.MessagesRequestBuilder()
        .setMessageId(latestId)
        .setLimit(this.messageLimit)
        .build();
      const messages = await messagesRequest.fetchNext();
      return messages;
    } catch (error) {
      // handle error
      return error;
    }
  }

  async fetchPreviousMessages(messagesRequest) {
    try {
      const messages = await messagesRequest.fetchPrevious();
      return messages;
    } catch (error) {
      // handle error
      return error;
    }
  }

  async getDirectMessageHistory() {
    const messagesRequest = new CometChat.MessagesRequestBuilder()
      .setUnread(true)
      .setLimit(this.messageLimit)
      .setUID(this.UID)
      .build();
    return this.fetchPreviousMessages(messagesRequest);
  }

  async getGroupMessageHistory(GUID) {
    const messagesRequest = new CometChat.MessagesRequestBuilder()
      .setUnread(true)
      .setLimit(this.messageLimit)
      .setGUID(GUID)
      .build();
    return this.fetchPreviousMessages(messagesRequest);
  }

  getUnreadMessageCount(type) {
    return type === 'user'
      ? CometChat.getUnreadMessageCountForUser(this.UID)
      : CometChat.getUnreadMessageCountForGroup(this.UID);
  }

  getAllUnreadMessageCount() {
    return CometChat.getUnreadMessageCount();
  }

  async getConversations() {
    const conversationsRequest = new CometChat.ConversationsRequestBuilder()
      .setLimit(this.conversationLimit)
      .build();

    try {
      const conversationList = await conversationsRequest.fetchNext();
      return conversationList;
    } catch (error) {
      // handle errors
      return error;
    }
  }

  userPresenceListener(listenerID) {
    CometChat.addUserListener(
      listenerID,
      new CometChat.UserListener({
        onUserOnline: () => {
          /* when someuser/friend comes online, user will be received here */
          // handle onlineUser
        },
        onUserOffline: () => {
          /* when someuser/friend went offline, user will be received here */
          // handle offlineUser
        },
      }),
    );
  }
}

export default Chat;
