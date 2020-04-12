import { ICreateDummyUsers, ICreateDummyChats, IFindChats, IFindOtherId, IFindOtherUser, ICreateDummyMessages } from "./interfaces/functions.interface";
import { Accounts } from 'meteor/accounts-base';
import { ChatsCollection } from "./chats";
import { Meteor } from "meteor/meteor";
import { MessagesCollection } from "./messages";

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
      return {
        ...chatCollection,
        title: username,
        picture: profile?.picture
      };
    });
};

export const findOtherId: IFindOtherId = (participants) => {
  const myId = Meteor.userId();
  return myId === participants![0] ? participants![1] : participants![0];
};

export const findOtherUser: IFindOtherUser = (_id) => {
  return Meteor.users.findOne({_id});
};