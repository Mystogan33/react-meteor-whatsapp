import React from 'react';
import StyledOtherProfile from '../elements/StyledOtherProfile';
import { findOtherUser } from '/imports/api/helpers';
import { User } from '/imports/api/interfaces/user.interface';
import Header from './Header';
import { IIcon } from '/imports/api/interfaces/global.interface';
import FontAwesome from 'react-fontawesome';
import Avatar from './Avatar';
import Actu from './Actu';
import ActuItem from './ActuItem';
import { IHandleShowImage } from '/imports/api/interfaces/functions.interface';
import { Tracker } from 'meteor/tracker';
import { ChatsCollection } from '/imports/api/chats';
import { Meteor } from 'meteor/meteor';

interface OtherProfileProps {
  otherUserId: User["_id"];
  onClose: () => void;
  onShowImage: IHandleShowImage;
};

const OtherProfile = ({ otherUserId, onClose, onShowImage }: OtherProfileProps) => {

  const icons: IIcon[] = [
    {
      name: "",
      func: () => {}
    },
    {
      name: "",
      func: () => {}
    },
    {
      name: "",
      func: () => {}
    }
  ];

  const otherUser = findOtherUser(otherUserId);
  const { profile, username } = otherUser!;

  const handleDeleteChat = () => {
    const chat = ChatsCollection.findOne({
      participants: { 
        $all: [otherUserId, Meteor.userId()!]
      }
    });

    if(chat) {
      Meteor.call('chat.remove', chat._id, (err: any) => {
        if(err) console.log(err);
      });
    }
  };
  
  return (
    <StyledOtherProfile>
      { otherUser
        ? (
          <>
            <Header iconClass="greyIcon" icons={icons}>
              <div className="OPH--heading">
                <FontAwesome name="times" className="iconOtherProfile" onClick={onClose} />
                <span className="OPH--title">Infos</span>
              </div>
            </Header>
            <div className="__scroll">
              <div className="OP--imageContainer">
                <Avatar 
                  onAvatarClick={() => onShowImage(profile?.picture!)}
                  big
                  avatar_url={profile?.picture} 
                />
                <div className="OPIC--textContainer">
                  <span className="OPIC--title">{username}</span>
                  <span className="OPIC--sbTitle"> En ligne</span>
                </div>
              </div>
              <Actu actu={profile?.actu} phone={profile?.phone} />
              <ActuItem iconName="ban" content="Bloquer" />
              <ActuItem iconName="thumbs-down" content="Supprimer le contact" />
              <ActuItem iconName="trash" content="Supprimer la discussion" handleAction={handleDeleteChat} />
            </div>
          </>
        ) : null
      }
    </StyledOtherProfile>
  )
};

export default OtherProfile;