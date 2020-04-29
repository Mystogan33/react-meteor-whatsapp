import React, { MouseEvent } from 'react';
import { Message, MessageType } from '/imports/api/interfaces/chat.interface';
import FontAwesome from 'react-fontawesome';
import Moment from 'react-moment';
import { IOnMsgTextClick } from '/imports/api/interfaces/functions.interface';

interface MessageTextProps extends Message {
  msgClass: string;
  id: Message["_id"];
  onClick: IOnMsgTextClick;
}

const MessageText = ({ id, msgClass, content, ownership, createdAt, onClick }: MessageTextProps) => {

  const onMsgClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, msgId: string, type: string) => {
    const message = e.currentTarget;
    if(message.classList.contains("message--mine")) {
      onClick(msgId, type);
    } else return;
  };

  return (
    <div className="messageContainer">
      <div className={msgClass} onClick={(e) => onMsgClick(e, id!, MessageType.TEXT)}>
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