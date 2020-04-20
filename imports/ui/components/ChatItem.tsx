import React from 'react';
import StyledChatItem from '../elements/StyledChatItem';
import Avatar from './Avatar';
import { Chat } from '/imports/api/interfaces/chat.interface';
import Moment from 'react-moment';
import moment from 'moment';
import { IHandleChatClick } from '/imports/api/interfaces/functions.interface';
import FontAwesome from 'react-fontawesome';

interface ChatItemProps extends Chat {
  onChatClick: IHandleChatClick
  active: boolean;
};

const ChatItem = ({  _id, title, picture, lastMessage, onChatClick, active }: ChatItemProps) => {
  const now = moment().format("D/MM/Y");
  const today = now === moment(lastMessage?.createdAt).format("D/MM/Y");
  return (
    <StyledChatItem onClick={() => onChatClick(_id)} active={active}>
      <Avatar large avatar_url={picture} />
      <div className="chat--contentContainer">
        <div className="content--line1">
          <span className="content--line1__title">{title}</span>
          <div className="content--line1__date">
            { today 
              ? <Moment format="HH:mm">{lastMessage?.createdAt}</Moment>
              : <Moment format="D/MM/YY">{lastMessage?.createdAt}</Moment>  
            }
          </div>
        </div>
        <div className="content--line1">
          { lastMessage?.type === "TEXT"
            ? <span className="content--message">{lastMessage?.content}</span>
            : (
              <span className="content--message">
                <FontAwesome name="camera" style={{ marginRight: "0.4rem"}} />
                Photo
              </span>
            )
          }
          <div className="chat--badge">4</div>
        </div>
      </div>
    </StyledChatItem>
  )
};

export default ChatItem;