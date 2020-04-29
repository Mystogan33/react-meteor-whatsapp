import React, { useState } from 'react';

import StyledLeft from '../elements/StyledLeft';
import Header from './Header';
import Avatar from './Avatar';
import { Meteor } from 'meteor/meteor';
import Status from './Status';
import Searchbar from './Searchbar';
import { Chat } from '/imports/api/interfaces/chat.interface';
import ChatList from './ChatList';
import { IHandleChatClick, IHandleUIClick } from '/imports/api/interfaces/functions.interface';
import { IIcon } from '/imports/api/interfaces/global.interface';
import LeftSide from './LeftSide';
import LSHeader from './LSHeader';
import LSForm from './LSForm';
import { withTracker } from 'meteor/react-meteor-data';
import UsersList from './UsersList';
import { User } from '/imports/api/interfaces/user.interface';

interface LeftProps {
  chats: Chat[];
  selectedChat: Chat;
  onChatClick: IHandleChatClick;
  OPVisible: boolean;
  picture?: any;
  onUserItemClick: IHandleUIClick;
};

const Left = ({ chats, onChatClick, selectedChat, OPVisible, picture, onUserItemClick }: LeftProps) => {
  const [LSVisible, setLSVisible] = useState(false);
  const [UListVisible, setUListVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [foundUsers, setFoundUsers] = useState<User[]>([]);
  const [chatQuery, setChatQuery] = useState("");
  const [foundChats, setFoundChats] = useState(chats);

  const showUList = () => {
    setLSVisible(true);
    setUListVisible(true);
  };

  const icons: IIcon[] = [
    {
      name: "circle-notch",
      func: () => {}
    },
    {
      name: "comment-alt",
      func: () => { showUList() }
    },
    {
      name: "ellipsis-v",
      func: () => {}
    }
  ];
  

  const toggleLS = () => {
    if(!LSVisible) setLSVisible(true);
    else {
      setLSVisible(false);
      setUListVisible(false);
    }
  };

  const userItemClick = (_id: string, username: string, picture: string) => {
    toggleLS();
    onUserItemClick(_id, username, picture);
  };

  const handleUSearch = (pattern: string) => {
    setSearchQuery(pattern);
    setFoundUsers(
      Meteor.users.find({
        _id: { $ne: Meteor.userId()!},
        username: { $regex: pattern, $options: 'i' }
      }, {
        sort: {
          username: 1
        }
      }).fetch()
    );
  };

  const handleChatSearch = (pattern: string) => {
    setChatQuery(pattern);

    const filteredChats = chats.filter((chat) => {
      if(pattern == null || pattern == "") return chat;
      else if(chat.title?.toLowerCase().includes(pattern.toLowerCase())) return chat;
    });

    setFoundChats(filteredChats);
  };

  const renderLSComponents = () => {
    if(UListVisible) {
      return (
        <>
          <LSHeader title="Nouvelle Discussion" onLSClose={toggleLS} />
          <Searchbar 
            placeholder="Chercher un contact"
            onSearch={handleUSearch}
          />
          <UsersList 
            onUserItemClick={userItemClick}
            searchQuery={searchQuery}
            foundUsers={foundUsers}
          />
        </>
      )
    }
    return (
      <>
        <LSHeader title="Profil" onLSClose={toggleLS} />
        <div className="LS--avatar">
          <Avatar inLS big avatar_url={picture} />
        </div>
        <LSForm type="username" />
        <div className="LS--desc">
          <span>Ce n'est pas votre nom d'utilisateur ou code pin. Ce nom sera visible auprès de vos contacts WhatsApp.</span>
        </div>
        <LSForm type="actu" />
      </>
    );
  };

  return (
    <StyledLeft OPVisible={OPVisible}>
      { !LSVisible
        ? (
          <>
            <Header icons={icons} iconClass="greyIcon">
              <Avatar onAvatarClick={toggleLS} avatar_url={picture} />
            </Header>
            <Status />
            <Searchbar 
              placeholder="Rechercher ou Démarrer une discussion"
              onSearch={handleChatSearch} 
            />
            <ChatList 
              chats={foundChats}
              onChatClick={onChatClick}
              selectedChat={selectedChat}
            />
          </>
        )
        : (
          <LeftSide>
            {renderLSComponents()}
          </LeftSide>
        )
      }
    </StyledLeft>
  )
};

const withTrackerHOC = withTracker(({ chats, onChatClick, selectedChat, OPVisible }: LeftProps) => {
  const user = Meteor.user();
  if(user && user.profile) {
    return {
      chats,
      onChatClick,
      selectedChat,
      OPVisible,
      picture: user.profile.picture
    }
  }
});

export default withTrackerHOC(Left);