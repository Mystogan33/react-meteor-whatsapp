import { Meteor } from 'meteor/meteor';
import { createDummyUsers, createDummyChats, createDummyMessages } from '/imports/api/helpers';
import { dummyUsers } from '../imports/api/users';
import { ChatsCollection, dummyChats } from '/imports/api/chats';
import { MessagesCollection, DummyMessages } from '/imports/api/messages';

Meteor.startup(() => {
  const numberOfUsers = Meteor.users.find().count();
  const numberOfChats = ChatsCollection.find().count();
  const numberOfMessages = MessagesCollection.find().count();
  if(numberOfUsers === 0) createDummyUsers(dummyUsers);
  if(numberOfChats === 0) createDummyChats(dummyChats);
  if(numberOfMessages === 0) createDummyMessages(DummyMessages);
});
