import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';

import { Chat, Message } from '/imports/api/interfaces/chat.interface';
import { IIcon } from '/imports/api/interfaces/global.interface';
import { IHandleFooterSend, IHandleFabInputChange, IHandleAvatarClick, IOnMsgTextClick } from '/imports/api/interfaces/functions.interface';

import { MessagesCollection } from '/imports/api/messages';
import { uploadFile, findOtherId } from '/imports/api/helpers';

import Header from './Header';
import Avatar from './Avatar';
import Footer from './Footer';
import Modal from './Modal';
import MessageBox from './MessageBox';

import StyledMessageView from '../elements/StyledMessageView';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

interface MessageViewProps {
  selectedChat: Chat;
  chatMessages?: Message[];
  onAvatarClick: IHandleAvatarClick;
  OPVisible: boolean;
  onMsgTxtClick: IOnMsgTextClick;
};

let fileInput: any = null;

const MessageView = ({ selectedChat, chatMessages, onAvatarClick, OPVisible, onMsgTxtClick }: MessageViewProps) => {
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

  const handlePaperClick = () => setFabVisible(!fabVisible);

  const handleSend: IHandleFooterSend = (content, type) => {
    const userId = Meteor.userId();

    if(userId) {
      const message: Message = {
        chatId: selectedChat._id,
        content,
        createdAt: moment().toDate(),
        senderId: userId,
        type,
        read: false
      };

      if(modalVisible) handleModalClose();

      Meteor.call('message.insert', message, (err: Error, id: any) => {
        if(err) console.log("[Error during Message Insert]", err);
        else {
          uploadFile(fileInput, true);
          Tracker.autorun(() => {
            const imageUrl = Session.get("wwc__imageUrl");
            if(imageUrl && message.type === "IMAGE") {
              Meteor.call('message.update', id, imageUrl, (err: any, _: any) => {
                if(err) console.log(err);
              });
            }
          });
        };
      });
    }
  };

  const handleFabClick = () => {
    const myInput = document.getElementById('fileUpload')!;
    myInput.click();
  };

  const handleFabInputChange: IHandleFabInputChange = ({ target }) => {
    if(target && target.files) fileInput = target.files[0];

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

  const avatarClick = () => {
    const otherId: string = findOtherId(selectedChat?.participants);
    onAvatarClick(otherId);
  };

  return (
    <StyledMessageView>
      <Header OPVisible={OPVisible} iconClass="greyIcon" icons={icons}>
        <Avatar avatar_url={selectedChat.picture} onAvatarClick={avatarClick} />
        <div className="headerMsg--container">
          <span className="headerMsg--title">{selectedChat.title}</span>
          <span className="headerMsg--sbTitle">En ligne</span>
        </div>
      </Header>
      { modalVisible
        ? <Modal onClose={handleModalClose} selectedImage={selectedImage} onUpload={handleSend} />
        : (
          <>
            <MessageBox 
              messages={chatMessages}
              selectedChat={selectedChat}
              fabVisible={fabVisible}
              handleFabClick={handleFabClick}
              handleFabInputChange={handleFabInputChange}
              onMsgTxtClick={onMsgTxtClick}
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