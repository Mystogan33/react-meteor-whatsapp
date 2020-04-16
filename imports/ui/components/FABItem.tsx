import React, { ReactNode, HTMLAttributes } from 'react';
import FontAwesome from 'react-fontawesome';

interface FABItemProps extends HTMLAttributes<HTMLDivElement> {
  iconName: string;
  bg: string;
  children?: ReactNode;
  onClick?: () => void;
};

const FABItem = ({ iconName, bg, children, onClick }: FABItemProps) => {

  const setBg = () => {
    switch(bg) {
      case 'violet':
        return {
          background: "#BF59CF"
        }
      case 'orange':
        return {
          background: "#F47B34"
        }
      case 'blue':
        return {
          background: "#5157AE"
        }
      case 'lightblue':
        return {
          background: "#0A7BBF"
        }
      default:
        return {
          background: "#FFF"
        }
    }
  };

  return (
    <div onClick={onClick} style={setBg()} className="fab">
      <FontAwesome className="fab--icon" name={iconName} />
      { children }
    </div>
  )
};

export default FABItem;