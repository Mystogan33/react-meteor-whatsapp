import React from 'react';
import { Message } from '/imports/api/interfaces/chat.interface';
import FontAwesome from 'react-fontawesome';
import Moment from 'react-moment';

interface MessageTextProps extends Message {
  msgClass: string;
}

const MessageText = ({ msgClass, content, ownership, createdAt }: MessageTextProps) => {
  return (
    <div className="messageContainer">
      <div className={msgClass}>
        <p>{content}</p>
        <div className="detailsContainer">
          <span>
            <Moment format="HH:mm">
              {createdAt}
            </Moment>
          </span>
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