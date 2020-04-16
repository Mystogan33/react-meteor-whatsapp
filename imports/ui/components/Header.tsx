import React from 'react';
import StyledHeader from '../elements/StyledHeader';
import FontAwesome from 'react-fontawesome';
import { IIcon } from '/imports/api/interfaces/global.interface';

interface HeaderProps {
  icons: IIcon[];
  iconClass: string;
  iconsWidthSmall?: any;
  children: any;
};

const Header = ({ icons, iconClass, iconsWidthSmall, children }: HeaderProps) => {

  const renderIcons = () => {
    return icons.map((icon, i) => {
      return (
        <FontAwesome 
          key={i} 
          className={iconClass} 
          name={icon.name}
          onClick={icon.func} 
        />
      )
    });
  };

  return (
    <StyledHeader>
      {children}
      <div className={iconsWidthSmall ? "icons--left small" : "icons--left"}>
        {renderIcons()}
      </div>
    </StyledHeader>
  );
};

export default Header;