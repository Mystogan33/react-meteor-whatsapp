import React from 'react';

import StyledLeft from '../elements/StyledLeft';
import Header from './Header';
import Avatar from './Avatar';
import { Meteor } from 'meteor/meteor';
import Status from './Status';
import Searchbar from './Searchbar';
import { Chat } from '/imports/api/interfaces/chat.interface';
import ChatList from './ChatList';
import { IHandleChatClick } from '/imports/api/interfaces/functions.interface';

const icons = [
  "circle-notch",
  "comment-alt",
  "ellipsis-v"
];

interface LeftProps {
  chats: Chat[];
  selectedChat: Chat;
  onChatClick: IHandleChatClick;
};

const Left = ({ chats, onChatClick, selectedChat }: LeftProps) => {
  return (
    <StyledLeft>
      <Header icons={icons} iconClass="greyIcon">
        <Avatar avatar_url={Meteor.user()?.profile.picture} />
      </Header>
      <Status />
      <Searchbar />
      <ChatList chats={chats} onChatClick={onChatClick} selectedChat={selectedChat} />
    </StyledLeft>
  )
};

export default Left;