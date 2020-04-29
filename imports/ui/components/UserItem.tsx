import React from 'react';
import Avatar from './Avatar';
import StyledUserItem from '../elements/StyledUserItem';
import { User } from '/imports/api/interfaces/user.interface';
import { IHandleUIClick } from '/imports/api/interfaces/functions.interface';

interface UserItemProps extends User {
  id: User["_id"];
  picture?: string | undefined;
  actu?: string | undefined;
  onUserItemClick: IHandleUIClick;
};

const UserItem = ({ id, picture, username, actu, onUserItemClick }: UserItemProps) => {
  return (
    <StyledUserItem onClick={() => onUserItemClick(id!, username!, picture!)}>
      <Avatar large avatar_url={picture} />
      <div className="chat--contentContainer">
        <div className="content--line1">
          <span className="content--line1__title">{username}</span>
        </div>
        <div className="content--line1">
          <span className="content--message">{actu}</span>
        </div>
      </div>
    </StyledUserItem>
  );
};

export default UserItem;