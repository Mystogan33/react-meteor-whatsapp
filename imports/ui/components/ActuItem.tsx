import React from 'react';
import StyledActuItem from '../elements/StyledActuItem';
import FontAwesome from 'react-fontawesome';

interface ActuItemProps {
  red?: boolean;
  iconName: string;
  content: string;
  handleAction?: any;
};

const ActuItem = ({ red, iconName, content, handleAction }: ActuItemProps) => {
  return (
    <div onClick={handleAction}>
      <StyledActuItem red={red}>
        <FontAwesome className="AI--icon" name={iconName} />
        <span>{content}</span>
      </StyledActuItem>
    </div>
  )
};

export default ActuItem;