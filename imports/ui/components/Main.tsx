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
import { withTracker } from 'meteor/react-meteor-data';

interface MainProps {
  loading: boolean;
  chats: Chat[]
};

const Main = ({ loading, chats }: MainProps) => {
  const [messageVisible, setMessageVisible] = useState(false);
  const [selectedChat, setSelectedChat] = useState<Chat>({});

  const handleChatClick: IHandleChatClick = (_id) => {
    if(!messageVisible) setMessageVisible(true);
    const newChat = _.find(chats, {_id});
    if(newChat) setSelectedChat(newChat);
  };

  return (
    <StyledMain>
      { !loading
        ? (
          <>
            <Left chats={chats} onChatClick={handleChatClick} selectedChat={selectedChat} />
            <Right right messageVisible={messageVisible} selectedChat={selectedChat} />
          </>
        )
        : null
      }
    </StyledMain>
  );
};

const withTrackerHOC = withTracker(() => {
  const isChatsReady = Meteor.subscribe('chats.mine').ready();
  const isMessagesReady = Meteor.subscribe('messages.all').ready();

  return {
    loading: isChatsReady && isMessagesReady ? false: true,
    chats: findChats()
  };
});

export default withTrackerHOC(Main);