import React from 'react';
import StyledChatList from '../elements/StyledChatList';
import { Chat } from '/imports/api/interfaces/chat.interface';
import ChatItem from './ChatItem';
import { IHandleChatClick } from '/imports/api/interfaces/functions.interface';

interface ChatListProps {
  chats: Chat[];
  selectedChat: Chat;
  onChatClick: IHandleChatClick;
}

const ChatList = ({ chats, onChatClick, selectedChat }: ChatListProps) => {

  const renderchats = () => {
    return chats
      .sort((a, b) => {
        return (b.lastMessage?.createdAt && a.lastMessage?.createdAt)
        ? b.lastMessage.createdAt.getTime() - a.lastMessage.createdAt.getTime()
        : 0;
      })
      .map(chat => {
        const active: boolean = selectedChat._id === chat._id;
        return (
          <ChatItem 
            key={chat._id}
            {...chat}
            onChatClick={onChatClick}
            active={active}
          />
        );
    });
  };

  return (
    <StyledChatList>
      {renderchats()}
    </StyledChatList>
  );
};

export default ChatList;