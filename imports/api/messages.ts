import { Mongo } from "meteor/mongo";
import { Message, MessageType } from "./interfaces/chat.interface";
import { Meteor } from "meteor/meteor";
import moment from "moment";
import { ImagesCollection } from "./images";

export const MessagesCollection = new Mongo.Collection<Message>('Messages');

if(Meteor.isServer) {
  Meteor.publish('messages.all', function() {
    return MessagesCollection.find();
  });
  Meteor.methods({
    "message.insert": function(message: Message) {
      return MessagesCollection.insert(message);
    },
    "message.update": function(_id: string, content: string) {
      return MessagesCollection.update({ _id }, { $set: { content } });
    },
    "message.update.badges": function(chatId: string, otherId: string) {
      return MessagesCollection.update({
        chatId,
        senderId: otherId
      }, {
        $set: {
          read: true
        }
      }, {
        multi: true
      });
    },
    "message.delete": function(_id: string) {
      console.log("[id to remove]", _id);
      const messageToDelete = MessagesCollection.findOne({ _id });
      console.log(messageToDelete);
      
      if(messageToDelete && messageToDelete.content) {
        if(messageToDelete.type === MessageType.IMAGE) {
          const idToRemove = messageToDelete.content.split("/original/").pop()!.split('.png')[0];
          ImagesCollection.remove(idToRemove, (err: any) => {
            console.log(err);
          });
        }
      
        return MessagesCollection.remove(_id);
      }
    }
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

