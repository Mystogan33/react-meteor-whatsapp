import React from 'react';
import StyledAvatar from '../elements/StyledAvatar';

interface AvatarProps {
  avatar_url?: string;
  large?: boolean;
};

const Avatar = ({ avatar_url }: AvatarProps) => {
  return (
    <StyledAvatar>
      <img src={avatar_url} alt="_avatar" className="avatar--img" />
    </StyledAvatar>
  )
};

export default Avatar;