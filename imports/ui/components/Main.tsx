import React, { useState } from 'react';
import StyledMain from '../elements/StyledMain';
import Left from './Left';
import Right from './Right';
import { Meteor } from 'meteor/meteor';
import { findChats } from '/imports/api/helpers';
import { IHandleChatClick, IHandleAvatarClick, IHandleUIClick, IHandleShowImage, IOnMsgTextClick } from '/imports/api/interfaces/functions.interface';
import _ from 'lodash';
import { Chat, MessageType } from '/imports/api/interfaces/chat.interface';
import { withTracker } from 'meteor/react-meteor-data';
import OtherProfile from './OtherProfile';
import { ChatsCollection } from '/imports/api/chats';
import moment from 'moment';
import BigOverlay from './BigOverlay';
import ImageViewer from './ImageViewer';
import Popup from './Popup';
import { Session } from 'meteor/session';

interface IOP {
  visible: boolean;
  otherId: string | null;
};

interface IBigOverlay {
  image: {
    visible: boolean;
    url: string;
  };
  popup: {
    visible: boolean;
    title: string;
  }
}

interface MainProps {
  loading: boolean;
  chats: Chat[]
};

const initialOP: IOP = {
  visible: false,
  otherId: null
};

const initialBigOverlay: IBigOverlay = {
  image: {
    visible: false,
    url: ""
  },
  popup: {
    visible: false,
    title: ""
  }
};

const Main = ({ loading, chats }: MainProps) => {
  const [messageVisible, setMessageVisible] = useState(false);
  const [selectedChat, setSelectedChat] = useState<Chat>({});
  const [OP, setOP] = useState(initialOP);
  const [BOVisible, setBOVisible] = useState(initialBigOverlay);

  const handleChatClick: IHandleChatClick = (_id) => {
    if(!messageVisible) setMessageVisible(true);
    const foundChat = _.find(chats, { _id });
    if(foundChat) setSelectedChat(foundChat);
    else {
      const newChat = ChatsCollection.findOne(_id)!;
      setSelectedChat(newChat);
    }
  };

  const handleAvatarClick: IHandleAvatarClick = (otherId) => {
    setOP({
      visible: true,
      otherId
    });
  };

  const handleClose = () => {
    setOP({
      visible: false,
      otherId: ""
    });
  };

  const handleUIClick: IHandleUIClick = (otherUserId, username, picture) => {
    const chat = ChatsCollection.findOne({
      participants: { 
        $all: [otherUserId, Meteor.userId()!]
      }
    });

    if(chat) handleChatClick(chat._id);
    else {
      const newChatId = ChatsCollection.insert({
        title: username,
        picture: picture,
        participants: [otherUserId, Meteor.userId()!],
        lastMessage: {
          content: username,
          createdAt: moment().toDate(),
          type: MessageType.TEXT
        }
      });
  
      handleChatClick(newChatId);
    }
  };

  const handleShowImage: IHandleShowImage = (imageUrl) => {
    setBOVisible(prevState => {
      return {
        ...prevState,
        image: {
          visible: true,
          url: imageUrl
        }
      }
    });
  };

  const handleCloseBO = () => {
    setBOVisible((_) => {
      return {
        image: {
          visible: false,
          url: ""
        },
        popup: {
          visible: false,
          title: ""
        }
      }
    });
  };

  const handleMsgClick: IOnMsgTextClick = (msgId, type) => {
    Session.set('wwc--message__id', msgId);
    setBOVisible(prevState => {
      return {
        ...prevState,
        popup: {
          visible: true,
          title: type === MessageType.TEXT ? "Supprimer le message" : "Supprimer l'Image" 
        }
      }
    });
  };

  const handleDeleteMsg = () => {
    const msgId = Session.get('wwc--message__id');

    Meteor.call('message.delete', msgId, (err: any, _: any) => {
      if(err) console.log('[Message Delete Error]', err);
      else handleCloseBO();
    });
  };

  const handleDeleteChat = (userId: string) => {
    const chat = ChatsCollection.findOne({
      participants: { 
        $all: [userId, Meteor.userId()!]
      }
    });

    if(chat) {
      Meteor.call('chat.remove', chat._id, (err: any) => {
        if(err) console.log(err);
      });
    }
  };

  return (
    <StyledMain>
      { !loading
        ? (
          <>
            <Left 
              OPVisible={OP.visible} 
              chats={chats} 
              onChatClick={handleChatClick} 
              selectedChat={selectedChat}
              onUserItemClick={handleUIClick}
            />
            <Right 
              OPVisible={OP.visible}
              right
              messageVisible={messageVisible}
              selectedChat={selectedChat}
              onAvatarClick={handleAvatarClick}
              onMsgTxtClick={handleMsgClick}
            />
            {BOVisible.popup.visible
              ? (
                  <BigOverlay>
                    <Popup 
                      title={BOVisible.popup.title}
                      onCancel={handleCloseBO}
                      onDelete={handleDeleteMsg}
                    />
                  </BigOverlay>
                )
              : null
            }
            { BOVisible.image.visible
              ? (
                <BigOverlay>
                  <ImageViewer imageUrl={BOVisible.image.url} onClose={handleCloseBO} />
                </BigOverlay>
              )
              : null
            }
            { OP.visible && OP.otherId
              ? <OtherProfile 
                  otherUserId={OP.otherId}
                  onClose={handleClose}
                  onShowImage={handleShowImage}
                  handleDeleteChat={handleDeleteChat} />
              : null
            }
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