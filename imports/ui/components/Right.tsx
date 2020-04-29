import React from 'react';

import StyledRight from '../elements/StyledRight';
import RightImg from './RightImg';
import MessageView from './MessageView';
import { Chat } from '/imports/api/interfaces/chat.interface';
import { IHandleAvatarClick, IOnMsgTextClick } from '/imports/api/interfaces/functions.interface';

const messageText = "Whatsapp se connecte à votre téléphone pour synchroniser les messages. Pour réduire l'utilisation des données, connectez votre téléphone à un réseau Wi-Fi.";

interface RightProps {
  right: boolean;
  messageVisible: boolean;
  selectedChat: Chat;
  OPVisible: boolean;
  onAvatarClick: IHandleAvatarClick;
  onMsgTxtClick: IOnMsgTextClick;
}

const Right = ({ right, messageVisible, selectedChat, onAvatarClick, OPVisible, onMsgTxtClick }: RightProps) => {
  return (
    <StyledRight OPVisible={OPVisible}>
      { messageVisible
        ? <MessageView 
            selectedChat={selectedChat}
            onAvatarClick={onAvatarClick}
            OPVisible={OPVisible}
            onMsgTxtClick={onMsgTxtClick}
          />
        : <RightImg messageText={messageText} right={right} />
      }
    </StyledRight>
  );
};

export default Right;