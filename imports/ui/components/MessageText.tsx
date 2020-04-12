import React from 'react';
import { Message } from '/imports/api/interfaces/chat.interface';
import FontAwesome from 'react-fontawesome';

interface MessageTextProps extends Message {
  msgClass: string;
}

const MessageText = ({ msgClass, content, ownership }: MessageTextProps) => {
  return (
    <div className="messageContainer">
      <div className={msgClass}>
        <p>{content}</p>
        <div className="detailsContainer">
          <span>11:33</span>
          { ownership === "mine"
            ? <FontAwesome name="check-double" />
            : null
          }
        </div>
      </div>
    </div>
  )
};

export default MessageText;