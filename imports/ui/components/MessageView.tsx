import React from 'react';
import StyledMessageView from '../elements/StyledMessageView';
import { Chat, Message, MessageType } from '/imports/api/interfaces/chat.interface';
import Header from './Header';
import Avatar from './Avatar';
import Footer from './Footer';
import MessageBox from './MessageBox';
import { MessagesCollection } from '/imports/api/messages';
import { IHandleFooterSend } from '/imports/api/interfaces/functions.interface';
import moment from 'moment';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

interface MessageViewProps {
  selectedChat: Chat;
  chatMessages: Message[]
};

const icons = [
  "search",
  "paperclip",
  "ellipsis-v"
];

const MessageView = ({ selectedChat, chatMessages }: MessageViewProps) => {

  const handleSend: IHandleFooterSend = (content) => {
    const userId = Meteor.userId();
    if(userId) {
      const message: Message = {
        chatId: selectedChat._id,
        content,
        createdAt: moment().toDate(),
        senderId: userId,
        type: MessageType.TEXT,
        read: false
      };

      Meteor.call('message.insert', message, (err: Error, _: any) => {
        if(err) console.log(err);
      });
    }
  };

  return (
    <StyledMessageView>
      <Header iconClass="greyIcon" icons={icons}>
        <Avatar avatar_url={selectedChat.picture} />
        <div className="headerMsg--container">
          <span className="headerMsg--title">{selectedChat.title}</span>
          <span className="headerMsg--sbTitle">En ligne</span>
        </div>
      </Header>
      <MessageBox messages={chatMessages} />
      <Footer onSend={handleSend} />
    </StyledMessageView>
  )
};

const withTrackerHOC = withTracker(({ selectedChat }: MessageViewProps) => ({
  chatMessages: MessagesCollection.find({ chatId: selectedChat._id}).fetch()
}));

export default withTrackerHOC(MessageView);