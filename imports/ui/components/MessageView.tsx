import React from 'react';
import StyledMessageView from '../elements/StyledMessageView';
import { Chat, Message } from '/imports/api/interfaces/chat.interface';
import Header from './Header';
import Avatar from './Avatar';
import Footer from './Footer';
import MessageBox from './MessageBox';
import { Tracker } from 'meteor/tracker';
import { MessagesCollection } from '/imports/api/messages';

interface MessageViewProps {
  selectedChat: Chat
};

const icons = [
  "search",
  "paperclip",
  "ellipsis-v"
];

const MessageView = ({ selectedChat }: MessageViewProps) => {
  let messages: Message[] = [];
  Tracker.autorun(() => {
    messages = MessagesCollection.find({chatId: selectedChat._id}).fetch();
  });

  return (
    <StyledMessageView>
      <Header iconClass="greyIcon" icons={icons}>
        <Avatar avatar_url={selectedChat.picture} />
        <div className="headerMsg--container">
          <span className="headerMsg--title">{selectedChat.title}</span>
          <span className="headerMsg--sbTitle">En ligne</span>
        </div>
      </Header>
      <MessageBox messages={messages} />
      <Footer />
    </StyledMessageView>
  )
};

export default MessageView;