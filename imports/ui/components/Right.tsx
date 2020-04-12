import React from 'react';

import StyledRight from '../elements/StyledRight';
import RightImg from './RightImg';
import MessageView from './MessageView';
import { Chat } from '/imports/api/interfaces/chat.interface';

const messageText = "Whatsapp se connecte à votre téléphone pour synchroniser les messages. Pour réduire l'utilisation des données, connectez votre téléphone à un réseau Wi-Fi.";

interface RightProps {
  right: boolean;
  messageVisible: boolean;
  selectedChat: Chat
}

const Right = ({right, messageVisible, selectedChat}: RightProps) => {
  return (
    <StyledRight>
      { messageVisible
        ? <MessageView selectedChat={selectedChat} />
        : <RightImg messageText={messageText} right={right} />
      }
    </StyledRight>
  );
};

export default Right;