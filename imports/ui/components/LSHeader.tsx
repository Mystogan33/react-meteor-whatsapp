import React from 'react';
import FontAwesome from 'react-fontawesome';

interface LSHeaderProps {
  onLSClose?: any;
  title: string;
};

const LSHeader = ({ onLSClose, title }: LSHeaderProps) => {
  return (
    <div className="LS--header">
      <div className="LS--header__line">
        <FontAwesome className="LS--header__icon" name="arrow-left" onClick={onLSClose} />
        <span>{title}</span>
      </div>
    </div>
  );
};

export default LSHeader;