import { Mongo } from "meteor/mongo";
import { Message, MessageType } from "./interfaces/chat.interface";
import { Meteor } from "meteor/meteor";
import moment from "moment";

export const MessagesCollection = new Mongo.Collection<Message>('Messages');

if(Meteor.isServer) {
  Meteor.publish('messages.all', function() {
    return MessagesCollection.find();
  });
};

export const DummyMessages: Message[] = [
  {
    chatId: "gktPv75tuKNLxcwBA",
    content: "Salut ça va ?",
    createdAt: moment().subtract(2, 'days').toDate(),
    type: MessageType.TEXT,
  },
  {
    chatId: "p4XchsBX8WWh2m9tP",
    content: "Salut ça va ?",
    createdAt: moment().subtract(2, 'days').toDate(),
    type: MessageType.TEXT,
  },
  {
    chatId: "gktPv75tuKNLxcwBA",
    content: "Salut ça va ?",
    createdAt: moment().subtract(2, 'days').toDate(),
    type: MessageType.TEXT,
  },
  {
    chatId: "p4XchsBX8WWh2m9tP",
    content: "Salut ça va ?",
    createdAt: moment().subtract(2, 'days').toDate(),
    type: MessageType.TEXT,
  },
  {
    chatId: "gktPv75tuKNLxcwBA",
    content: "Salut ça va ?",
    createdAt: moment().subtract(1, 'days').toDate(),
    type: MessageType.TEXT,
  },
  {
    chatId: "p4XchsBX8WWh2m9tP",
    content: "Salut ça va ?",
    createdAt: moment().subtract(1, 'days').toDate(),
    type: MessageType.TEXT,
  },
  {
    chatId: "gktPv75tuKNLxcwBA",
    content: "Salut ça va ?",
    createdAt: moment().subtract(1, 'days').toDate(),
    type: MessageType.TEXT,
  },
  {
    chatId: "p4XchsBX8WWh2m9tP",
    content: "Salut ça va ?",
    createdAt: moment().subtract(1, 'days').toDate(),
    type: MessageType.TEXT,
  },
  {
    chatId: "gktPv75tuKNLxcwBA",
    content: "Salut ça va ?",
    createdAt: moment().toDate(),
    type: MessageType.TEXT,
  },
  {
    chatId: "p4XchsBX8WWh2m9tP",
    content: "Salut ça va ?",
    createdAt: moment().toDate(),
    type: MessageType.TEXT,
  },
  {
    chatId: "gktPv75tuKNLxcwBA",
    content: "Salut ça va ?",
    createdAt: moment().toDate(),
    type: MessageType.TEXT,
  },
  {
    chatId: "p4XchsBX8WWh2m9tP",
    content: "Salut ça va ?",
    createdAt: moment().toDate(),
    type: MessageType.TEXT,
  },
  {
    chatId: "gktPv75tuKNLxcwBA",
    content: "Salut ça va ?",
    createdAt: moment().toDate(),
    type: MessageType.TEXT,
  },
  {
    chatId: "p4XchsBX8WWh2m9tP",
    content: "Salut ça va ?",
    createdAt: moment().toDate(),
    type: MessageType.TEXT,
  },
  {
    chatId: "gktPv75tuKNLxcwBA",
    content: "Salut ça va ?",
    createdAt: moment().toDate(),
    type: MessageType.TEXT,
  },
  {
    chatId: "p4XchsBX8WWh2m9tP",
    content: "Salut ça va ?",
    createdAt: moment().toDate(),
    type: MessageType.TEXT,
  },
  {
    chatId: "gktPv75tuKNLxcwBA",
    content: "Salut ça va ?",
    createdAt: moment().toDate(),
    type: MessageType.TEXT,
  },
  {
    chatId: "p4XchsBX8WWh2m9tP",
    content: "Salut ça va ?",
    createdAt: moment().toDate(),
    type: MessageType.TEXT,
  },
];

