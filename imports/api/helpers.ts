import { Accounts } from 'meteor/accounts-base';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';

import { 
  ICreateDummyUsers,
  ICreateDummyChats, 
  IFindChats, 
  IFindOtherId, 
  IFindOtherUser, 
  ICreateDummyMessages, 
  IFindLastMessage, 
  IUploadFile, 
  IGetBadges,
  IUpdateBadges
} from "./interfaces/functions.interface";

import { ChatsCollection } from "./chats";
import { MessagesCollection } from "./messages";
import { ImagesCollection } from "./images";

export const createDummyUsers: ICreateDummyUsers = (users) => users.forEach(user => Accounts.createUser(user));
export const createDummyChats: ICreateDummyChats = (chats) => chats.forEach(chat => ChatsCollection.insert(chat));
export const createDummyMessages: ICreateDummyMessages = (messages) => messages.forEach(message => MessagesCollection.insert(message));

export const findChats: IFindChats = () => {
  return ChatsCollection
    .find()
    .fetch()
    .map(chatCollection => {
      const otherUserId = findOtherId(chatCollection.participants);
      const { username, profile } = findOtherUser(otherUserId)!;
      const lastMessage = findLastMessage(chatCollection._id);

      const chat = {
        ...chatCollection,
        title: username,
        picture: profile?.picture,
        lastMessage: lastMessage? lastMessage : undefined
      };

      if(lastMessage) chat.lastMessage = lastMessage;
      return chat;
    });
};

export const findOtherId: IFindOtherId = (participants) => {
  const myId = Meteor.userId();
  let otherUserId = myId === participants![0] ? participants![1] : participants![0];
  return otherUserId;
};

export const findOtherUser: IFindOtherUser = (_id) => Meteor.users.findOne({_id});

export const findLastMessage: IFindLastMessage = (chatId) => {
  const messages = MessagesCollection.find({ chatId }, { sort: { createdAt: -1 }}).fetch();
  
  if(!messages[0]) return ChatsCollection.findOne(chatId)!.lastMessage!;
  else return messages[0];
};

export const uploadFile: IUploadFile = (file, isMessage) => {
  const fileUpload = ImagesCollection.insert({
    file,
    streams: "dynamic",
    chunkSize: "dynamic",
    allowWebWorkers: true
  }, false);

  fileUpload.on('end', (err: any, fileObj: any) => {
    if(err) console.log("[Upload Error]", err);
    else {
      const _id = fileObj._id;
      if(isMessage) {
        Meteor.call('images.url', _id, (err: any, url: string) => {
          if(err) console.log("[End Upload Error]", err);
          else Session.set('wwc__imageUrl', url);
        });
      } else Meteor.call('user.picture', _id);
    }
  });

  fileUpload.start();
};

export const getBadges: IGetBadges = (chatId) => {
  const foundChat = ChatsCollection.findOne(chatId);

  if(foundChat) {
    const otherId = findOtherId(foundChat.participants);
    const badgeNumber = MessagesCollection.find({ chatId, senderId: otherId, read: false }).count();
    return badgeNumber;
  } else return 0;
};

export const updateBadges: IUpdateBadges = (participants, chatId) => {
  const otherId = findOtherId(participants);
  Meteor.call("message.update.badges", chatId, otherId);
};