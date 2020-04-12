import { Mongo } from "meteor/mongo";
import { Chat } from "./interfaces/chat.interface";
import moment from 'moment';
import { Meteor } from "meteor/meteor";

export const ChatsCollection = new Mongo.Collection<Chat>('Chats');
export const dummyChats: Chat[] = [
  {
    title: "",
    picture: "",
    participants: ["2X4kooXP6Nd8XEQbJ", "QfkfMGmq4miJ7SGWC"],
    lastMessage: {
      content: "Salut ça va ?",
      createdAt: moment().toDate()
    }
  },
  {
    title: "",
    picture: "",
    participants: ["QfkfMGmq4miJ7SGWC", "tdK8Yc3HJmaRRyhAP"],
    lastMessage: {
      content: "Salut çomment tu vas ?",
      createdAt: moment().subtract(1, 'days').toDate()
    }
  },
  {
    title: "",
    picture: "",
    participants: ["2X4kooXP6Nd8XEQbJ", "dXNyt8Py3LptDGwNQ"],
    lastMessage: {
      content: "Eh j'ai une question",
      createdAt: moment().subtract(3, 'month').toDate()
    }
  }
];

if(Meteor.isServer) {
  Meteor.publish('chats.all', function() {
    return ChatsCollection.find();
  });
  Meteor.publish('chats.mine', function() {
    return ChatsCollection.find({ 
      participants: {
        $in: [this.userId]
      }
    });
  });
}