import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';

import { Chat, Message, MessageType } from '/imports/api/interfaces/chat.interface';
import { IIcon } from '/imports/api/interfaces/global.interface';
import { IHandleFooterSend, IHandleFabInputChange } from '/imports/api/interfaces/functions.interface';

import { MessagesCollection } from '/imports/api/messages';

import Header from './Header';
import Avatar from './Avatar';
import Footer from './Footer';
import Modal from './Modal';
import MessageBox from './MessageBox';

import StyledMessageView from '../elements/StyledMessageView';
import { uploadFile } from '/imports/api/helpers';

interface MessageViewProps {
  selectedChat: Chat;
  chatMessages: Message[]
};

let fileInput: any = null;

const MessageView = ({ selectedChat, chatMessages }: MessageViewProps) => {
  const icons: IIcon[] = [
    {
      name: "search",
      func: () => {}
    },
    {
      name: "paperclip",
      func: () => handlePaperClick()
    },
    {
      name: "ellipsis-v",
      func: () => {}
    }
  ];

  const [fabVisible, setFabVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>("");

  const handlePaperClick = () => {
    setFabVisible(!fabVisible);
  };

  const handleSend: IHandleFooterSend = (content) => {
    const userId = Meteor.userId();

    if(userId) {
      const message: Message = {
        chatId: selectedChat._id,
        content,
        createdAt: moment().toDate(),
        senderId: userId,
        type: MessageType.TEXT,
        read: false
      };

      Meteor.call('message.insert', message, (err: Error, _: any) => {
        if(err) console.log(err);
      });
    }
  };

  const handleFabClick = () => {
    const myInput = document.getElementById('fileUpload')!;
    myInput.click();
  };

  const handleFabInputChange: IHandleFabInputChange = ({ target }) => {
    if(target && target.files) fileInput = target.files[0];
    console.log("[HandleFabInputChange]", fileInput);

    if(fileInput) {
      const fileReader = new FileReader();
      fileReader.onload = function(e) {
        if(e && e.target) setSelectedImage(e.target.result);
      };
      fileReader.readAsDataURL(fileInput);
      setModalVisible(true);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setFabVisible(false);
  };

  return (
    <StyledMessageView>
      <Header iconClass="greyIcon" icons={icons}>
        <Avatar avatar_url={selectedChat.picture} />
        <div className="headerMsg--container">
          <span className="headerMsg--title">{selectedChat.title}</span>
          <span className="headerMsg--sbTitle">En ligne</span>
        </div>
      </Header>
      { modalVisible
        ? <Modal onClose={handleModalClose} selectedImage={selectedImage} onUpload={() => uploadFile(fileInput)} />
        : (
          <>
            <MessageBox 
              messages={chatMessages}
              selectedChat={selectedChat}
              fabVisible={fabVisible}
              handleFabClick={handleFabClick}
              handleFabInputChange={handleFabInputChange}
            />
            <Footer onSend={handleSend} />
          </>
        )
      }
    </StyledMessageView>
  )
};

const withTrackerHOC = withTracker(({ selectedChat }: MessageViewProps) => ({
  chatMessages: MessagesCollection.find({ chatId: selectedChat._id}).fetch()
}));

export default withTrackerHOC(MessageView);