import React, { useEffect } from 'react';
import StyledMessageBox from '../elements/StyledMessageBox';
import { Message, Chat } from '/imports/api/interfaces/chat.interface';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import moment from 'moment';
import Day from './Day';
import MessageText from './MessageText';
import FlipMove from 'react-flip-move';
import FABs from './FABs';
import { IHandleFabInputChange, IOnMsgTextClick } from '/imports/api/interfaces/functions.interface';
import MessageImage from './MessageImage';
import { updateBadges } from '/imports/api/helpers';

interface NormalizedMessage {
  date: string;
  groupedMessages: Message[];
  today: boolean;
};

interface MessageBoxProps {
  messages?: Message[];
  selectedChat: Chat;
  fabVisible: boolean;
  handleFabClick: () => void;
  handleFabInputChange: IHandleFabInputChange;
  onMsgTxtClick: IOnMsgTextClick;
}

const MessageBox = ({ messages, selectedChat, fabVisible, handleFabClick, handleFabInputChange, onMsgTxtClick }: MessageBoxProps) => {
  let isEven = false;
  const dFormat = "D MMMM Y";
  let chatEndDiv: HTMLDivElement;

  messages!.forEach(message => {
    if(!message.senderId) {
      message.ownership = !!message.ownership === isEven ? 'mine': 'other';
      isEven = !isEven;
      return message;
    } else {
      message.ownership = message.senderId === Meteor.userId() ? 'mine': 'other';
      return message;
    };
  });

  const groupedMessages = _.groupBy(messages, (message: Message) => moment(message.createdAt).format(dFormat));
  const newMessages: NormalizedMessage[] = (
    Object
    .keys(groupedMessages)
    .map(key => ({ 
      date: key,
      groupedMessages: groupedMessages[key],
      today: moment().format(dFormat) === key 
    }))
  );
    
  const renderMessages = (message: NormalizedMessage) => {
    return message.groupedMessages.map(({_id, content, ownership, createdAt, type}) => {
      const msgClass = `message message--${ownership}`;

      if(type === "IMAGE") {
        const mine = ownership === "mine";
        return (
          <MessageImage 
            key={_id}
            content={content}
            createdAt={createdAt}
            mine={mine}
            onImgClick={() => onMsgTxtClick(_id!, type)}
          />
        )
      }

      return (
        <MessageText 
          key={_id}
          id={_id}
          msgClass={msgClass}
          content={content}
          ownership={ownership}
          createdAt={createdAt}
          onClick={onMsgTxtClick}
        />
      );
    });
  };

  const renderDays = () => {
    return newMessages.map((message, index) => {
      const { today, date } = message;
      const dateText = today ? "Aujourd'hui" : date
      return (
        <div key={index}> 
          <Day date={dateText} />
          {renderMessages(message)}
        </div>
      );
    });
  };

  const scrollToBottom = () => chatEndDiv.scrollIntoView({ behavior: "smooth"});

  useEffect(() => {
    scrollToBottom();
    updateBadges(selectedChat.participants, selectedChat._id);
  }, [selectedChat, messages]);

  return (
    <StyledMessageBox>
      <FABs fabVisible={fabVisible} handleFabClick={handleFabClick} handleFabInputChange={handleFabInputChange} />
      <FlipMove>
        {renderDays()}
      </FlipMove>
      <div ref={(el: HTMLDivElement) => chatEndDiv = el} />
    </StyledMessageBox>
  )
};

export default MessageBox;