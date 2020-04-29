import React, { useState } from 'react';
import StyledAvatar from '../elements/StyledAvatar';
import FontAwesome from 'react-fontawesome';
import { IHandleFabInputChange } from '/imports/api/interfaces/functions.interface';
import { uploadFile } from '/imports/api/helpers';

interface AvatarProps {
  avatar_url?: string;
  onAvatarClick?: () => void;
  big?: boolean;
  inLS?: boolean;
  large?: boolean;
};

const Avatar = ({ avatar_url, onAvatarClick, big, inLS, large }: AvatarProps) => {

  const [isHovered, setIsHovered] = useState(false);

  const showOverlay = () => {
    if(!isHovered) setIsHovered(true);
    return;
  };

  const hideOverlay = () => {
    if(isHovered) setIsHovered(false);
    return;
  };

  const onInputChange: IHandleFabInputChange = (e) => {
    if(e.target.files) {
      const file = e.target.files[0];
      if(file) {
        uploadFile(file, false);
        hideOverlay();
      }
    }
  };

  const handleOverlayClick = () => {
    const fileInput = document.getElementById('avatarUpload')!;
    fileInput.click();
  };

  const renderOverlay = () => {
    if(inLS && isHovered) {
      return (
        <div className="avatar--overlay" onMouseLeave={hideOverlay} onClick={handleOverlayClick}>
          <FontAwesome name="camera" className="overlay--icon" />
          <span className="overlay--text">CHANGER DE</span>
          <span className="overlay--text">PHOTO DE</span>
          <span className="overlay--text">PROFIL</span>
        </div>
      );
    }
  };

  return (
    <StyledAvatar large={large} big={big}>
      <img 
        src={avatar_url}
        alt="_avatar"
        className="avatar--img"
        onClick={onAvatarClick}
        onMouseEnter={showOverlay}
      />
      <input type="file" id="avatarUpload" accept="image/*" onChange={onInputChange} />
      {renderOverlay()}
    </StyledAvatar>
  )
};

export default Avatar;