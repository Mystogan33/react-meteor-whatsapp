import { ICreateDummyUsers, ICreateDummyChats, IFindChats, IFindOtherId, IFindOtherUser, ICreateDummyMessages, IFindLastMessage, IUploadFile } from "./interfaces/functions.interface";
import { Accounts } from 'meteor/accounts-base';
import { ChatsCollection } from "./chats";
import { Meteor } from "meteor/meteor";
import { MessagesCollection } from "./messages";
import { ImagesCollection } from "./images";

export const createDummyUsers: ICreateDummyUsers = (users) => {
  users.forEach(user => Accounts.createUser(user));
};

export const createDummyChats: ICreateDummyChats = (chats) => {
  chats.forEach(chat => ChatsCollection.insert(chat));
};

export const createDummyMessages: ICreateDummyMessages = (messages) => {
  messages.forEach(message => MessagesCollection.insert(message));
};

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
  return myId === participants![0] ? participants![1] : participants![0];
};

export const findOtherUser: IFindOtherUser = (_id) => {
  return Meteor.users.findOne({_id});
};

export const findLastMessage: IFindLastMessage = (chatId) => {
  const foundMessage = MessagesCollection.findOne({ chatId }, { sort: { createdAt: -1 }});
  if(!foundMessage) {
    return null;
  } else return foundMessage;
};

export const uploadFile: IUploadFile = (file) => {
  const fileUpload = ImagesCollection.insert({
    file,
    streams: 'dynamic',
    chunkSize: 'dynamic',
    allowWebWorkers: true
  }, false);

  fileUpload.on('start', () => console.log("Start"));
  fileUpload.on('end', (err: any, fileObj: any) => {
    if(err) console.log("[End Error]", err);
    else console.log("[End File]", fileObj);
  });

  fileUpload.on('err', (err: any, _: any) => {
    console.log(err);
  });

  fileUpload.on('progress', (progression: any, _: any) => {
    console.log("[Progress]", progression);
  });

  fileUpload.start();
};