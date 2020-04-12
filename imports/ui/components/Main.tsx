import React, { useState } from 'react';
import StyledMain from '../elements/StyledMain';
import Left from './Left';
import Right from './Right';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { findChats } from '/imports/api/helpers';
import { IHandleChatClick } from '/imports/api/interfaces/functions.interface';
import _ from 'lodash';
import { Chat } from '/imports/api/interfaces/chat.interface';

const Main = () => {
  Tracker.autorun(() => {
    Meteor.subscribe('chats.mine');
    Meteor.subscribe('messages.all');
  });
  const [messageVisible, setMessageVisible] = useState(false);
  const [selectedChat, setSelectedChat] = useState<Chat>({});

  const handleChatClick: IHandleChatClick = (_id) => {
    if(!messageVisible) setMessageVisible(true);
    const newChat = _.find(findChats(), {_id});
    if(newChat) setSelectedChat(newChat);
  };

  return (
    <StyledMain>
      <Left chats={findChats()} onChatClick={handleChatClick} selectedChat={selectedChat} />
      <Right right messageVisible={messageVisible} selectedChat={selectedChat} />
    </StyledMain>
  );
};

export default Main;