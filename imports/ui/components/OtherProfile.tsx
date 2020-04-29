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

interface OtherProfileProps {
  otherUserId: User["_id"];
  onClose: () => void;
  onShowImage: IHandleShowImage;
  handleDeleteChat: any;
};

const OtherProfile = ({ otherUserId, onClose, onShowImage, handleDeleteChat }: OtherProfileProps) => {

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
              <ActuItem iconName="trash" content="Supprimer la discussion" handleAction={() => handleDeleteChat(otherUserId)} />
            </div>
          </>
        ) : null
      }
    </StyledOtherProfile>
  )
};

export default OtherProfile;