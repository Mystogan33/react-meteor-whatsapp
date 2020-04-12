import React from 'react';
import StyledMessageBox from '../elements/StyledMessageBox';
import { Message } from '/imports/api/interfaces/chat.interface';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import moment from 'moment';
import Day from './Day';
import MessageText from './MessageText';

interface NormalizedMessage {
  date: string;
  groupedMessages: Message[];
  today: boolean;
};

interface MessageBoxProps {
  messages: Message[];
}

const MessageBox = ({ messages }: MessageBoxProps) => {
  let isEven = false;
  const dFormat = "D MMMM Y";

  messages.forEach(message => {
    if(!message.senderId) {
      message.ownership = !!message.ownership === isEven ? 'mine': 'other';
      isEven = !isEven;
      return message;
    } else {
      message.ownership = message.senderId === Meteor.userId() ? 'mine': 'other';
      return message;
    };
  });

  const groupedMessages = _.groupBy(messages, message => moment(message.createdAt).format(dFormat));
  const newMessages: NormalizedMessage[] = Object.keys(groupedMessages).map(key => ({ date: key, groupedMessages: groupedMessages[key], today: moment().format(dFormat) === key }));

  const renderMessages = (message: NormalizedMessage) => {
    return message.groupedMessages.map(({_id, content, ownership}) => {
      const msgClass = `message message--${ownership}`;
      return (
        <MessageText key={_id} msgClass={msgClass} content={content} ownership={ownership} />
      );
    });
  }

  const renderDays = () => {
    console.log(newMessages);
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

  return (
    <StyledMessageBox>
      {renderDays()}
    </StyledMessageBox>
  )
};

export default MessageBox;